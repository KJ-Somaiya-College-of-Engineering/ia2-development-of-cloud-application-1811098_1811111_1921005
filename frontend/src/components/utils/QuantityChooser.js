import React from "react";
import { Button } from "react-bootstrap";
import "./QuantityChooser.scss";
const QuantityChooser = ({
  maxQuantity,
  onChange,
  initialQuantity,
  currentQuantity,
}) => {
  const [qty, setQty] = React.useState(null);
  React.useEffect(() => {
    setQty(currentQuantity || initialQuantity);
  }, [currentQuantity, initialQuantity]);
  const increment = () => {
    if (qty < maxQuantity) {
      onChange(qty + 1);
      setQty(qty + 1);
    } else {
      alert(`Maximum Order quantity is ${maxQuantity}`);
    }
  };
  const decrement = () => {
    if (qty > initialQuantity) {
      onChange(qty - 1);
      setQty(qty - 1);
    } else {
      alert(`minimum Order quantity is ${initialQuantity}`);
    }
  };
  return (
    <div className="qty-chooser">
      <Button
        onClick={decrement}
        variant="danger"
        className="qty-button decrease"
      >
        -
      </Button>
      <span>{qty}</span>
      <Button
        variant="success"
        onClick={increment}
        className="qty-button increase"
      >
        +
      </Button>
    </div>
  );
};

export default QuantityChooser;
