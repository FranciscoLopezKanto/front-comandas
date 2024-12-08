import { useState, useEffect } from "react";
import { Button, Typography, Box, Card, CardContent, CardActions, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useTables } from "../TablesContext";

export function TableDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { tables, setTableStatus } = useTables();
  const tableId = parseInt(id || "0");

  const table = tables.find((table) => table.id === tableId);
  const [isOccupied, setIsOccupied] = useState(table?.status === 1);

  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Recuperar carrito de localStorage solo si la mesa está en pedido
  useEffect(() => {
    if (isOccupied) {
      const storedCart = localStorage.getItem(`table_${tableId}_cart`);
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } else {
      setCart([]); // Limpiar el carrito si la mesa no está ocupada
    }
  }, [tableId, isOccupied]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/product");
        const data = await response.json();
        if (data.success === "success") {
          setProducts(data.data);
          setFilteredProducts(data.data);
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

  const saveCartToLocalStorage = (currentCart: any[]) => {
    localStorage.setItem(`table_${tableId}_cart`, JSON.stringify(currentCart));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.totalPrice, 0);
  };

  const handleTableInOrder = () => {
    // Guardar el carrito actual en localStorage
    saveCartToLocalStorage(cart);

    // Cambiar el estado de la mesa a "ocupada"
    setTableStatus(tableId, 1);
    setIsOccupied(true);

    alert("El carrito actual ha sido guardado. La mesa está en pedido.");
  };

  const sendOrder = async () => {
    const user_id = 1; // Usuario temporal
    const tablenumber = tableId;

    try {
      for (const item of cart) {
        const orderData = {
          user_id,
          product_id: item.id,
          quantity: item.quantity,
          tablenumber,
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

      // Borrar el carrito después de enviar el pedido
      localStorage.removeItem(`table_${tableId}_cart`);

      setIsOccupied(false);
      setTableStatus(tableId, 0); // Cambiar estado a "libre"
      setCart([]); // Limpiar el carrito en el estado
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
            <Card key={product.id} sx={{ marginBottom: 2 }}>
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
              cart.map((item, index) => (
                <Box key={index} sx={{ marginBottom: 2 }}>
                  <Typography>
                    {item.name} - ${item.totalPrice} (x{item.quantity})
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography>No hay productos en el carrito</Typography>
            )}
          </Box>

          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Total: ${getCartTotal()}
          </Typography>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", marginTop: 3 }}>
            <Button variant="contained" color="warning" onClick={handleTableInOrder}>
              Mesa en Pedido
            </Button>
            <Button variant="contained" color="success" onClick={sendOrder}>
              Enviar Pedido
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default TableDetails;
