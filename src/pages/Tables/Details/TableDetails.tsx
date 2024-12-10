import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useTables } from "../TablesContext";
import { GetOrderIdContext } from "../GetOrderIdContext";
import { PostCompleteOrderContext } from "../PostCompleteOrder";
import { UserContext } from "../../../components/Subcomponent/UserContext";

export function TableDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { tables, setTableStatus } = useTables();
  const { lastOrderId, fetchLastOrderId, refreshOrderId } = useContext(GetOrderIdContext)!;
  const { updateOrderStatus } = useContext(PostCompleteOrderContext)!;
  const { currentUser } = useContext(UserContext)!;

  const tableId = parseInt(id || "0");
  const table = tables.find((table) => table.id === tableId);
  const [isOccupied, setIsOccupied] = useState(table?.status === 1);
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [notes, setNotes] = useState<{ [productId: number]: string }>({});

  useEffect(() => {
    if (isOccupied) {
      const storedCart = localStorage.getItem(`table_${tableId}_cart`);
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } else {
      setCart([]);
    }
  }, [tableId, isOccupied]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/product");
        const data = await response.json();
        if (data.success === "success") {
          const sortedProducts = data.data.sort((a: any, b: any) => a.id - b.id);
          setProducts(sortedProducts);
          setFilteredProducts(sortedProducts);
        }
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  const handleAddToCart = (product: any) => {
    const productInCart = cart.find((item) => item.id === product.id);

    if (productInCart) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1, totalPrice: item.totalPrice + product.price }
          : item
      );
      setCart(updatedCart);
    } else {
      const newProduct = {
        ...product,
        quantity: 1,
        totalPrice: product.price,
      };
      setCart([...cart, newProduct]);
    }
  };

  const handleRemoveFromCart = (productId: number) => {
    const updatedCart = cart
      .map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1, totalPrice: item.totalPrice - item.price }
          : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
  };

  const handleNoteChange = (productId: number, note: string) => {
    setNotes((prevNotes) => ({ ...prevNotes, [productId]: note }));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.totalPrice, 0);
  };

  const saveCartToLocalStorage = (currentCart: any[], currentNotes: { [productId: number]: string }) => {
    localStorage.setItem(`table_${tableId}_cart`, JSON.stringify(currentCart));
    localStorage.setItem(`table_${tableId}_notes`, JSON.stringify(currentNotes));
  };

  const handleTableInOrder = () => {
    saveCartToLocalStorage(cart, notes);
    setTableStatus(tableId, 1);
    setIsOccupied(true);
    alert("El carrito actual y las notas han sido guardados. La mesa está en pedido.");
  };

  useEffect(() => {
    if (isOccupied) {
      const storedCart = localStorage.getItem(`table_${tableId}_cart`);
      const storedNotes = localStorage.getItem(`table_${tableId}_notes`);

      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    } else {
      setCart([]);
      setNotes({});
    }
  }, [tableId, isOccupied]);

  const sendOrder = async () => {
    if (!currentUser) {
      alert("No hay usuario logueado.");
      return;
    }

    const user_id = currentUser.user_id;
    const tablenumber = tableId;

    try {
      const refreshedOrderIdBefore = await refreshOrderId();
      console.log("Nuevo order_id antes de hacer los pedidos:", refreshedOrderIdBefore);

      for (const item of cart) {
        const orderData = {
          user_id,
          product_id: item.id,
          quantity: item.quantity,
          tablenumber,
          note: notes[item.id] || "",
        };

        const response = await fetch("http://localhost:3000/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });

        if (!response.ok) {
          throw new Error(`Error al enviar el pedido para el producto ${item.name}`);
        }
      }

      alert("Pedido enviado con éxito");

      const refreshedOrderIdAfter = await refreshOrderId();
      console.log("Nuevo order_id después de hacer los pedidos:", refreshedOrderIdAfter);

      if (refreshedOrderIdAfter !== null) {
        const updateResponse = await updateOrderStatus(refreshedOrderIdAfter);
        console.log(updateResponse);
      }

      localStorage.removeItem(`table_${tableId}_cart`);
      localStorage.removeItem(`table_${tableId}_notes`);
      setIsOccupied(false);
      setTableStatus(tableId, 0);
      setCart([]);
      setNotes({});
    } catch (error) {
      console.error("Error al enviar el pedido:", error);
      alert("Error al enviar el pedido. Inténtalo nuevamente.");
    }
  };

  return (
    <Box sx={{ padding: 2, marginTop: "80px" }}>
      <Typography variant="h4" gutterBottom align="center">
        Mesa {tableId}
      </Typography>

      <Typography variant="h6" color={isOccupied ? "error" : "success"} gutterBottom align="center">
        Estado: {isOccupied ? "Ocupada" : "Libre"}
      </Typography>

      <Box sx={{ display: "flex", gap: 3, justifyContent: "space-between", marginTop: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" gutterBottom>
            Productos Disponibles
          </Typography>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id="category-select-label">Filtrar por Categoría</InputLabel>
            <Select
              labelId="category-select-label"
              value={selectedCategory}
              label="Filtrar por Categoría"
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <MenuItem value="">Todas las Categorías</MenuItem>
              <MenuItem value="Bebida">Bebida</MenuItem>
              <MenuItem value="Entrada">Entrada</MenuItem>
              <MenuItem value="Principal">Principal</MenuItem>
              <MenuItem value="Postre">Postre</MenuItem>
            </Select>
          </FormControl>

          {filteredProducts.map((product) => (
            <Card key={product.id} sx={{ marginBottom: 1 }}>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2">Precio: ${product.price}</Typography>
                <Typography variant="body2">Stock: {product.stock}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock <= 0}
                >
                  Agregar Producto
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" gutterBottom>
            Productos en Carrito
          </Typography>

          <Box sx={{ backgroundColor: "#fff", padding: 2, borderRadius: 2, boxShadow: 2 }}>
            {cart.length > 0 ? (
              cart.map((item) => (
                <Box key={item.id} sx={{ marginBottom: 2 }}>
                  <Typography>
                    {item.name} - ${item.totalPrice} (x{item.quantity})
                  </Typography>

                  <TextField
                    label="Nota"
                    variant="outlined"
                    multiline
                    rows={2}
                    value={notes[item.id] || ""}
                    onChange={(e) => handleNoteChange(item.id, e.target.value)}
                    sx={{ marginTop: 1 }}
                  />

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemoveFromCart(item.id)}
                    sx={{ marginTop: 1 }}
                  >
                    Eliminar
                  </Button>
                </Box>
              ))
            ) : (
              <Typography>No hay productos en el carrito.</Typography>
            )}

            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Total: ${getCartTotal()}
            </Typography>

            <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={sendOrder}
                disabled={cart.length === 0}
              >
                Enviar Pedido
              </Button>

              <Button
                variant="contained"
                color="success"
                onClick={handleTableInOrder}
              >
                Mesa en Pedido
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
