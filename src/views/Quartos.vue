<template>
    <div class="flex flex-wrap justify-center">
        <!-- Exibição dos quartos -->
        <Quarto
          v-for="(quarto, index) in sortedQuartos"
          :key="index"
          :roomType="quarto.type"
          :roomNumber="quarto.number"
        />
      </div>
    <Footer class=" inset-x-0 bottom-0"/>
  </template>
  
  <script>
  import Quarto from '../components/Quarto.vue';
  import Footer from '../components/Footer.vue';
  
  export default {
    name: 'Quartos',
    components: {
      Quarto,
      Footer
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
    }
  }
};
  </script>
  
  <style>
  /* Estilos específicos para a view Quartos */
  </style>