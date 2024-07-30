<template>
    <div class="bg-white border m-4 shadow-md rounded size-52">
        <div class="">
            <div class="text-center">
                <h2 class="text-3xl font-semibold mt-4">{{ roomNumber }}</h2>
                <p class="text-md uppercase">{{ roomType }}</p>
            </div>
            <div :class="statusClass" class="flex flex-row justify-center items-center mt-12">
                <h1 class="uppercase text-white">{{ statusText }}</h1>
            </div>
            <div class="flex flex-row justify-center">
                <button v-if="showDelete" @click="removeQuarto"
                    class="bg-red-500 text-white px-2 py-1 rounded mt-4">Excluir</button>
                <button @click="toggleStatus" class="bg-gray-500 text-white px-2 py-1 rounded mt-4 ml-4">Mudar
                    Status</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Quarto',
    props: {
        roomType: String,
        roomNumber: Number,
        showDelete: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            statuses: ['disponível', 'reservado', 'ocupado', 'sujo'],
            currentStatusIndex: 0
        };
    },
    computed: {
        statusText() {
            return this.statuses[this.currentStatusIndex];
        },
        statusClass() {
            const status = this.statuses[this.currentStatusIndex];
            switch (status) {
                case 'disponível':
                    return 'bg-green-500'; // Verde
                case 'reservado':
                    return 'bg-blue-500'; // Azul
                case 'ocupado':
                    return 'bg-red-600'; // Vermelho
                case 'sujo':
                    return 'bg-orange-500'; // Laranja
                default:
                    return '';
            }
        }
    },
    mounted() {
        this.loadStatus();
    },
    methods: {
        removeQuarto() {
            this.$emit('remove', this.roomNumber);
            this.removeStatus();
        },
        toggleStatus() {
            this.currentStatusIndex = (this.currentStatusIndex + 1) % this.statuses.length;
            this.saveStatus();
        },
        saveStatus() {
            const key = `quarto_${this.roomNumber}_status`;
            localStorage.setItem(key, this.currentStatusIndex);
        },
        loadStatus() {
            const key = `quarto_${this.roomNumber}_status`;
            const savedIndex = localStorage.getItem(key);
            if (savedIndex !== null) {
                this.currentStatusIndex = parseInt(savedIndex, 10);
            }
        },
        removeStatus() {
            const key = `quarto_${this.roomNumber}_status`;
            localStorage.removeItem(key);
        }
    }
};
</script>

<style scoped>
/* Estilos específicos para o componente Quarto */
</style>