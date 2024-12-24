import * as React from "react";
import { View, Text } from "react-native";
import Button from "./Button";
import { Styles } from "../styles/GlobalStyles"; // Assuming this file exists
import { myColors } from "../styles/Colors"; // Assuming this file exists

export default function MyKeyboard() {
  const [firstNumber, setFirstNumber] = React.useState("");
  const [secondNumber, setSecondNumber] = React.useState("");
  const [operation, setOperation] = React.useState("");
  const [result, setResult] = React.useState<Number | null>(null);

  const handleNumberPress = (buttonValue: string) => {
    if (firstNumber.length < 10) {
      setFirstNumber(firstNumber + buttonValue);
    }
  };

  const handleOperationPress = (buttonValue: string) => {
    setOperation(buttonValue);
    setSecondNumber(firstNumber);
    setFirstNumber("");
  };

  const clear = () => {
    setFirstNumber("");
    setSecondNumber("");
    setOperation("");
    setResult(null);
  };

  const firstNumberDisplay = () => {
    if (result !== null) {
      return (
        <Text
          style={
            result < 99999
              ? [Styles.screenFirstNumber, { color: myColors.result }]
              : [Styles.screenFirstNumber, { fontSize: 50, color: myColors.result }]
          }
        >
          {result?.toString()}
        </Text>
      );
    }
    if (firstNumber && firstNumber.length < 6) {
      return <Text style={Styles.screenFirstNumber}>{firstNumber}</Text>;
    }
    if (firstNumber === "") {
      return <Text style={Styles.screenFirstNumber}>{"0"}</Text>;
    }
    if (firstNumber.length > 5 && firstNumber.length < 8) {
      return (
        <Text style={[Styles.screenFirstNumber, { fontSize: 70 }]}>
          {firstNumber}
        </Text>
      );
    }
    if (firstNumber.length > 7) {
      return (
        <Text style={[Styles.screenFirstNumber, { fontSize: 50 }]}>
          {firstNumber}
        </Text>
      );
    }
  };

  const getResult = () => {
    switch (operation) {
      case "+":
        clear();
        setResult(parseInt(secondNumber) + parseInt(firstNumber));
        break;
      case "-":
        clear();
        setResult(parseInt(secondNumber) - parseInt(firstNumber));
        break;
      case "*":
        clear();
        setResult(parseInt(secondNumber) * parseInt(firstNumber));
        break;
      case "/":
        clear();
        setResult(parseInt(secondNumber) / parseInt(firstNumber));
        break;
      default:
        clear();
        setResult(0);
        break;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#1e1e2d", justifyContent: "flex-end", paddingBottom: 20 }}>
      {/* Display Section */}
      <View style={{ height: 120, width: "90%", justifyContent: "flex-end", alignSelf: "center" }}>
        
        {firstNumberDisplay()}
      </View>

      {/* Buttons Section */}
      <View>
        {/* First Row */}
        <View style={styles.buttonRow}>
          <Button title="C" isGray onPress={clear} style={styles.grayButton} />
          <Button title="+/-" isGray onPress={() => handleOperationPress("+/-")} style={styles.grayButton} />
          <Button title="％" isGray onPress={() => handleOperationPress("％")} style={styles.grayButton} />
          <Button title="÷" isBlue onPress={() => handleOperationPress("/")} style={styles.blueButton} />
        </View>

        {/* Second Row */}
        <View style={styles.buttonRow}>
          <Button title="7" onPress={() => handleNumberPress("7")} style={styles.greenButton} />
          <Button title="8" onPress={() => handleNumberPress("8")} style={styles.greenButton} />
          <Button title="9" onPress={() => handleNumberPress("9")} style={styles.greenButton} />
          <Button title="×" isBlue onPress={() => handleOperationPress("*")} style={styles.blueButton} />
        </View>

        {/* Third Row */}
        <View style={styles.buttonRow}>
          <Button title="4" onPress={() => handleNumberPress("4")} style={styles.greenButton} />
          <Button title="5" onPress={() => handleNumberPress("5")} style={styles.greenButton} />
          <Button title="6" onPress={() => handleNumberPress("6")} style={styles.greenButton} />
          <Button title="-" isBlue onPress={() => handleOperationPress("-")} style={styles.blueButton} />
        </View>

        {/* Fourth Row */}
        <View style={styles.buttonRow}>
          <Button title="1" onPress={() => handleNumberPress("1")} style={styles.greenButton} />
          <Button title="2" onPress={() => handleNumberPress("2")} style={styles.greenButton} />
          <Button title="3" onPress={() => handleNumberPress("3")} style={styles.greenButton} />
          <Button title="+" isBlue onPress={() => handleOperationPress("+")} style={styles.blueButton} />
        </View>

        {/* Fifth Row */}
        <View style={styles.buttonRow}>
          <Button title="." onPress={() => handleNumberPress(".")} style={styles.orangeButton} />
          <Button title="0" onPress={() => handleNumberPress("0")} style={styles.greenButton} />
          <Button title="⌫" onPress={() => setFirstNumber(firstNumber.slice(0, -1))} style={styles.redButton} />
          <Button title="=" isBlue onPress={() => getResult()} style={styles.btnEqual} />  {/* Ensure this is green now */}
        </View>
      </View>

      {/* Footer Text */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Calc by Kiran</Text>
      </View>
    </View>
  );
}

const styles = {
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 10,
  },
  grayButton: {
    backgroundColor: "#a6a6a6",
    color: "#fff",
    fontWeight: "bold",
  },
  blueButton: {
    backgroundColor: "#4a90e2",
    color: "#fff",
    fontWeight: "bold",
  },
  greenButton: {
    backgroundColor: "#4caf50",
    color: "#fff",
    fontWeight: "bold",
  },
  orangeButton: {
    backgroundColor: "#ff9800",
    color: "#fff",
    fontWeight: "bold",
  },
  redButton: {
    backgroundColor: "#f44336",
    color: "#fff",
    fontWeight: "bold",
  },
  footer: {
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    color: "#f5f5f5",
    fontSize: 16,
    fontWeight: "bold",
  },
  btnEqual: {
    backgroundColor: "#4CAF50",  // Green color for the "=" button
    color: "#fff",
    fontWeight: "bold",
  },
};
