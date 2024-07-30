<template>
  <div class="p-8 flex flex-col justify-center">
      <div class="">
          <h1 class="text-2xl font-bold mb-4 text-center">Adicionar Quartos</h1>
          <div class="flex flex-row justify-center">
              <form @submit.prevent="addQuarto" class="border rounded shadow-md px-4 py-8">
                  <div class="mb-2">
                      <label for="roomType" class="block text-sm font-medium">Tipo do Quarto</label>
                      <select v-model="newQuarto.type" id="roomType" class="border rounded p-2">
                          <option value="simples">Simples</option>
                          <option value="ventilador">Ventilador</option>
                          <option value="ar-condicionado">Ar-condicionado</option>
                      </select>
                  </div>
                  <div class="mb-2">
                      <label for="roomNumber" class="block text-sm font-medium">Número do Quarto</label>
                      <input v-model="newQuarto.number" type="number" id="roomNumber" class="border rounded p-2" required />
                  </div>
                  <button type="submit" class="bg-green-500 text-white p-2 rounded">Adicionar Quarto</button>
              </form>
          </div>
          <h2 class="mt-8 text-xl font-semibold text-center">Quartos Adicionados</h2>
          <div class="mt-8 flex flex-wrap justify-around">
              <Quarto
                  v-for="(quarto, index) in sortedQuartos"
                  :key="index"
                  :roomType="quarto.type"
                  :roomNumber="quarto.number"
                  :showDelete="true"
                  @remove="removeQuarto"
              />
          </div>
          <!-- Backup e Importação -->
          <div class="mt-8 text-center">
              <button @click="backupData" class="bg-green-500 text-white p-2 rounded mr-4">Backup</button>
              <input type="file" @change="importData" class="border rounded p-2" />
          </div>
      </div>
  </div>
</template>

<script>
import Quarto from '../components/Quarto.vue';

export default {
  name: 'Admin',
  components: {
      Quarto
  },
  data() {
      return {
          quartos: JSON.parse(localStorage.getItem('quartos')) || [],
          newQuarto: {
              type: 'simples',
              number: ''
          }
      };
  },
  computed: {
      sortedQuartos() {
          // Ordena os quartos com base no número
          return [...this.quartos].sort((a, b) => a.number - b.number);
      }
  },
  methods: {
      addQuarto() {
          if (this.newQuarto.number) {
              const novoQuarto = {
                  type: this.newQuarto.type,
                  number: this.newQuarto.number
              };
              this.quartos.push(novoQuarto);
              localStorage.setItem('quartos', JSON.stringify(this.quartos));
              // Limpar o formulário
              this.newQuarto.number = '';
          }
      },
      removeQuarto(roomNumber) {
          this.quartos = this.quartos.filter(quarto => quarto.number !== roomNumber);
          localStorage.setItem('quartos', JSON.stringify(this.quartos));
      },
      backupData() {
          const dataStr = JSON.stringify(this.quartos);
          const dataBlob = new Blob([dataStr], { type: 'application/json' });
          const url = URL.createObjectURL(dataBlob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'quartos_backup.json';
          a.click();
          URL.revokeObjectURL(url);
      },
      importData(event) {
          const file = event.target.files[0];
          if (file && file.type === 'application/json') {
              const reader = new FileReader();
              reader.onload = (e) => {
                  try {
                      const data = JSON.parse(e.target.result);
                      if (Array.isArray(data)) {
                          this.quartos = data;
                          localStorage.setItem('quartos', JSON.stringify(this.quartos));
                      } else {
                          alert('Arquivo JSON inválido');
                      }
                  } catch (error) {
                      alert('Erro ao importar dados: Arquivo inválido');
                  }
              };
              reader.readAsText(file);
          } else {
              alert('Por favor, selecione um arquivo JSON.');
          }
      }
  }
};
</script>

<style>
/* Estilos específicos para a view Admin */
</style>
