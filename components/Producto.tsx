import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, FlatList, StyleSheet, TextInput } from 'react-native';
import { buscarProductos } from '../constants/api';

const ProductoComponent = () => {
  const [productos, setProductos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nombreKDSB, setNombreKDSB] = useState(''); // Estado para el nombre
  const [descripcionKDSB, setDescripcionKDSB] = useState(''); // Estado para la descripción
  const [take, setTake] = useState(10); // Número de productos a tomar
  const [skip, setSkip] = useState(0); // Offset para la paginación

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    setLoading(true);
    setError(null);
    try {
      const productosData = await buscarProductos({ 
        nombreKDSB_Like: nombreKDSB, 
        descripcionKDSB_Like: descripcionKDSB, 
        skip: skip, // Usar el valor de skip
        take: take, // Usar el valor de take
        sendRowCount: 0 // O ajusta según lo que necesites
      });
      console.log('Datos de productos:', productosData);
      if (!productosData || productosData.length === 0) {
        setError('No se encontraron productos.');
      } else {
        setProductos(productosData);
      }
    } catch (error) {
      console.error('Error al buscar productos:', error);
      setError('No se pudo cargar la lista de productos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Buscar productos" onPress={cargarProductos} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>{error}</Text>
      ) : productos.length > 0 ? (
        <FlatList
          data={productos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.boldText}>Nombre: {item.nombreKDSB}</Text>
              <Text>Descripción: {item.descripcionKDSB}</Text>
              <Text>Precio: {item.precio}</Text>
            </View>
          )}
        />
      ) : (
        <Text>No se encontraron productos.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  itemContainer: {
    marginVertical: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default ProductoComponent;
