import React, { useState } from 'react';
import { SafeAreaView, TextInput, Button, Text, StyleSheet,Image,ScrollView } from 'react-native';

function gcd(a: number, b: number): number {
  // Приводим числа к положительным
  a = Math.abs(a);
  b = Math.abs(b);
  
  // Проверка на случай, если одно из чисел равно 0
  if (a === 0) return b;
  if (b === 0) return a;

  // Алгоритм Евклида
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  
  return a;
}

const App: React.FC = () => {
  const [count, setCount] = useState<string>('');
  const [numbers, setNumbers] = useState<string[]>([]);
  const [result, setResult] = useState<number | null>(null);

  const handleCountChange = (text: string) => {
    setCount(text);
    
    // Проверка на валидность введенного количества
    const numberCount = parseInt(text);
    if (!isNaN(numberCount) && numberCount > 0) {
      setNumbers(Array(numberCount).fill(''));
      setResult(null);
    } else {
      // Если количество недопустимо, очищаем массив
      setNumbers([]);
      setResult(null);
    }
  };

  const calculateGCD = () => {
    const parsedNumbers = numbers.map(num => parseInt(num)).filter(num => !isNaN(num));
    if (parsedNumbers.length > 0) {
      const initialGCD = parsedNumbers[0];
      const finalGCD = parsedNumbers.slice(1).reduce((acc, curr) => gcd(acc, curr), initialGCD);
      setResult(finalGCD);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../assets/images/logo-school.png')} style={styles.image} />
      <p style={styles.centeredText}>“Д.Қонаев атындағы жалпы білім беретін орта мектеп- гимназиясы”КММ</p>
      <p style={styles.centeredText}>Лұқпан Аяна Ибраева Томирис 5”Г”</p>
      <p style={styles.centeredText}>Жетекшілері: А.М Ержан С.А Садуакасова</p>
      <TextInput
        style={styles.input}
        placeholder="Введите количество чисел"
        keyboardType="numeric"
        onChangeText={handleCountChange}
        value={count}
      />
      <ScrollView >
      {numbers.map((num, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder={`Введите число ${index + 1}`}
          keyboardType="numeric"
          onChangeText={text => {
            const newNumbers = [...numbers];
            newNumbers[index] = text;
            setNumbers(newNumbers);
          }}
          value={num}
        />
      ))}
      </ScrollView>
      <Button title="Найти НОД" onPress={calculateGCD} style={styles.input}/>
      {result !== null && <Text style={styles.resultText}>НОД: {result}</Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    margin: 20,
    alignItems: 'center'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '100%', // Установка ширины на 100%
  },
  image: {
    width: 100, // Задайте нужную ширину
    height: 100, // Задайте нужную высоту
  },
  centeredText: {
    textAlign: 'center', // Центрируем текст
    fontSize: 18, // Установка размера шрифта (по желанию)
    color: 'black', // Установка цвета текста (по желанию)
  },
  resultText: {
    fontWeight: 'bold'
  }
});

export default App;
