import axios from 'axios';


const apiUrl = 'http://Productokdsb.somee.com'; 

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    
  },
});


export const obtenerProductoPorId = async (id) => {
    try {
      const response = await api.get(`/product/${id}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error al obtener el producto:', error);
      throw error;
    }
  };


export const buscarProductos = async (query) => {
    try {
      const response = await api.post('/product/search', {
        nombreKDSB_Like: "",
        descripcionKDSB_Like: "",
        Skip: query.skip || 0,
        Take: query.take || 10,
        SendRowCount: query.sendRowCount || 2
      });
      console.log('Respuesta de la API:', response.data); 
      if (Array.isArray(response.data.data)) {
        return response.data.data; 
      } else {
        throw new Error('La respuesta no contiene un array de productos');
      }
    } catch (error) {
      console.error('Error al buscar pddroductos:', error);
      throw error;
    }
  };
  


export const crearProducto = async (producto) => {
  try {
    const response = await api.post('/product', {
      NombreKDSB: producto.nombre,
      DescripcionKDSB: producto.descripcion,
      Precio: producto.precio,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
     
      console.error('Error en la respuesta del servidor:', error.response.data);
      console.error('Código de estado:', error.response.status);
      console.error('Cabeceras:', error.response.headers);
    } else if (error.request) {
     
      console.error('No se recibió respuesta:', error.request);
    } else {
     
      console.error('Error al configurar la solicitud:', error.message);
    }
    console.error('Error completo:', error);
    throw error;
  }
};


export default api;