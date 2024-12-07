import { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Estilo para el modal de confirmación
import {MesaContainer, MesaNumber, SwitchContainer} from './styles';


const MesaSwitch = ({ mesaNumber }: { mesaNumber: number }) => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    confirmAlert({
      title: "Confirmar acción",
      message: `¿Estás seguro de cambiar el estado de la mesa ${mesaNumber}?`,
      buttons: [
        {
          label: "Sí",
          onClick: () => setIsActive((prev) => !prev),
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <MesaContainer>
      <MesaNumber>Mesa {mesaNumber}</MesaNumber>
      <SwitchContainer>
        <input type="checkbox" checked={isActive} onChange={handleToggle} />
        <span />
      </SwitchContainer>
    </MesaContainer>
  );
};

export default MesaSwitch;
