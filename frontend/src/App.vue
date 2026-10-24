<script setup>
import { ref, onMounted } from 'vue';
import equipoService from './services/equipoService';

const equipos = ref([]);
const form = ref({
  codigoInventario: '',
  nombre: '',
  tipo: '',
  marca: '',
  modelo: '',
  ubicacion: '',
  estado: 'operativo',
  fechaAdquisicion: '',
  observaciones: ''
});

const errorMsg = ref('');

// Cargar la lista al iniciar
const obtenerEquipos = async () => {
  try {
    const response = await equipoService.getAll();
    equipos.value = response.data;
  } catch (error) {
    console.error('Error al cargar equipos:', error);
  }
};

// Guardar un nuevo equipo
const guardarEquipo = async () => {
  try {
    errorMsg.value = '';
    await equipoService.create(form.value);
    // Limpiar formulario y recargar lista
    form.value = {
      codigoInventario: '',
      nombre: '',
      tipo: '',
      marca: '',
      modelo: '',
      ubicacion: '',
      estado: 'operativo',
      fechaAdquisicion: '',
      observaciones: ''
    };
    obtenerEquipos();
  } catch (error) {
    errorMsg.value = error.response?.data?.message || 'Error al guardar el equipo';
  }
};

// Eliminar equipo
const eliminarEquipo = async (id) => {
  if (confirm('¿Estás seguro de eliminar este equipo?')) {
    try {
      await equipoService.delete(id);
      obtenerEquipos();
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  }
};

onMounted(() => {
  obtenerEquipos();
});
</script>

template
<template>
  <div style="max-width: 900px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
    <h1> Inventario Tecnológico</h1>

    <!-- Formulario de Registro -->
    <div style="background: #f4f4f4; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
      <h3>Registrar Nuevo Equipo</h3>
      <form @submit.prevent="guardarEquipo" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <input v-model="form.codigoInventario" placeholder="Código de Inventario" required style="padding: 8px;" />
        <input v-model="form.nombre" placeholder="Nombre del Equipo" required style="padding: 8px;" />
        <input v-model="form.tipo" placeholder="Tipo (Ej: Laptop, Servidor)" required style="padding: 8px;" />
        <input v-model="form.marca" placeholder="Marca" required style="padding: 8px;" />
        <input v-model="form.modelo" placeholder="Modelo" required style="padding: 8px;" />
        <input v-model="form.ubicacion" placeholder="Ubicación" required style="padding: 8px;" />
        
        <select v-model="form.estado" style="padding: 8px;">
          <option value="operativo">Operativo</option>
          <option value="en_mantenimiento">En Mantenimiento</option>
          <option value="dado_de_baja">Dado de Baja</option>
        </select>

        <input type="date" v-model="form.fechaAdquisicion" style="padding: 8px;" />
        
        <input v-model="form.observaciones" placeholder="Observaciones" style="grid-column: span 2; padding: 8px;" />

        <button type="submit" style="grid-column: span 2; background: #007bff; color: white; padding: 10px; border: none; border-radius: 4px; cursor: pointer;">
          Guardar Equipo
        </button>
      </form>
      <p v-if="errorMsg" style="color: red; margin-top: 10px;">{{ errorMsg }}</p>
    </div>

    <!-- Tabla de Equipos -->
    <h3>Listado de Equipos</h3>
    <table border="1" style="width: 100%; border-collapse: collapse; text-align: left;">
      <thead>
        <tr style="background: #ddd;">
          <th style="padding: 8px;">Código</th>
          <th style="padding: 8px;">Nombre</th>
          <th style="padding: 8px;">Tipo</th>
          <th style="padding: 8px;">Ubicación</th>
          <th style="padding: 8px;">Estado</th>
          <th style="padding: 8px;">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="eq in equipos" :key="eq.id">
          <td style="padding: 8px;">{{ eq.codigoInventario }}</td>
          <td style="padding: 8px;">{{ eq.nombre }}</td>
          <td style="padding: 8px;">{{ eq.tipo }}</td>
          <td style="padding: 8px;">{{ eq.ubicacion }}</td>
          <td style="padding: 8px;">{{ eq.estado }}</td>
          <td style="padding: 8px;">
            <button @click="eliminarEquipo(eq.id)" style="background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
              Eliminar
            </button>
          </td>
        </tr>
        <tr v-if="equipos.length === 0">
          <td colspan="6" style="text-align: center; padding: 15px;">No hay equipos registrados.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>