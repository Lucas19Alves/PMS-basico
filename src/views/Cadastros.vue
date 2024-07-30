<template>
    <div class="p-8">
        <!-- Backup e Importação -->
        <div class="m-8">
            <button @click="backupData" class="bg-green-500 text-white p-2 rounded mr-4">Backup</button>
            <input type="file" @change="importData" />
        </div>
        <div class="flex flex-col justify-evenly md:flex-row mt-8">
            <div class="text-center mb-8">
                <h1 class="text-2xl font-bold mb-4">Cadastro de Hóspedes</h1>

                <!-- Formulário de Cadastro -->
                <form @submit.prevent="addHospede" class="border rounded shadow-md px-28 py-8 mx-auto max-w-md">
                    <div class="mb-2">
                        <label for="nome" class="block text-sm font-medium">Nome</label>
                        <input v-model="newHospede.nome" type="text" id="nome" class="border rounded p-2" required />
                    </div>
                    <div class="mb-2">
                        <label for="cpf" class="block text-sm font-medium">CPF</label>
                        <input v-model="cpfInput" @blur="formatCpf" @input="updateCpf" type="text" id="cpf"
                            class="border rounded p-2" required />
                    </div>
                    <div class="mb-2">
                        <label for="dataNascimento" class="block text-sm font-medium">Data de Nascimento</label>
                        <input v-model="newHospede.dataNascimento" type="date" id="dataNascimento"
                            class="border rounded p-2" required />
                    </div>
                    <div class="mb-2">
                        <label for="cidade" class="block text-sm font-medium">Cidade</label>
                        <input v-model="newHospede.cidade" type="text" id="cidade" class="border rounded p-2"
                            required />
                    </div>
                    <div class="mb-2">
                        <label for="telefone" class="block text-sm font-medium">Telefone</label>
                        <input v-model="telefoneInput" @blur="formatTelefone" @input="updateTelefone" type="text"
                            id="telefone" class="border rounded p-2" required />
                    </div>
                    <div class="mb-2">
                        <label for="observacoes" class="block text-sm font-medium">Observações</label>
                        <textarea v-model="newHospede.observacoes" id="observacoes"
                            class="border rounded p-2"></textarea>
                    </div>
                    <button type="submit" class="bg-green-500 text-white p-2 rounded">Adicionar Hóspede</button>
                </form>
            </div>

            <!-- Pesquisa de Hóspedes -->
            <div class="mb-8 md:border-s md:ps-24">
                <h1 class="text-xl font-semibold mb-4">Pesquisar pelo cadastro</h1>
                <input v-model="searchQuery" type="text" placeholder="Pesquisar por nome ou CPF"
                    class="border rounded p-2 w-96" />
                <h2 class="text-xl font-semibold mb-4">Hóspedes Cadastrados</h2>
                <ul class="list-disc pl-5">
                    <li v-for="hospede in filteredHospedes" :key="hospede.cpf" class="mb-2">
                        <div class="border p-4 rounded shadow-sm">
                            <h3 class="font-semibold">{{ hospede.nome }} (CPF: {{ hospede.cpf }})</h3>
                            <p><strong>Data de Nascimento:</strong> {{ hospede.dataNascimento }}</p>
                            <p><strong>Cidade:</strong> {{ hospede.cidade }}</p>
                            <p><strong>Telefone:</strong> {{ hospede.telefone }}</p>
                            <p><strong>Observações:</strong> {{ hospede.observacoes }}</p>
                            <button @click="removeHospede(hospede.cpf)"
                                class="bg-red-500 text-white px-2 py-1 rounded mt-2">Excluir</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>


    </div>
</template>

<script>
export default {
    name: 'Cadastros',
    data() {
        return {
            newHospede: {
                nome: '',
                cpf: '',
                dataNascimento: '',
                cidade: '',
                telefone: '',
                observacoes: ''
            },
            cpfInput: '',
            telefoneInput: '',
            hospedes: JSON.parse(localStorage.getItem('hospedes')) || [],
            searchQuery: ''
        };
    },
    computed: {
        filteredHospedes() {
            const query = this.searchQuery.toLowerCase();
            return this.hospedes.filter(hospede =>
                hospede.nome.toLowerCase().includes(query) ||
                hospede.cpf.includes(query)
            );
        }
    },
    methods: {
        addHospede() {
            if (this.newHospede.cpf && this.newHospede.telefone) {
                const novoHospede = { ...this.newHospede, cpf: this.cpfInput, telefone: this.telefoneInput };
                this.hospedes.push(novoHospede);
                localStorage.setItem('hospedes', JSON.stringify(this.hospedes));
                this.resetForm();
            }
        },
        formatCpf() {
            this.cpfInput = this.cpfInput.replace(/\D/g, '').replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
            this.newHospede.cpf = this.cpfInput;
        },
        updateCpf(event) {
            this.cpfInput = event.target.value;
        },
        formatTelefone() {
            this.telefoneInput = this.telefoneInput.replace(/\D/g, '').replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
            this.newHospede.telefone = this.telefoneInput;
        },
        updateTelefone(event) {
            this.telefoneInput = event.target.value;
        },
        removeHospede(cpf) {
            this.hospedes = this.hospedes.filter(hospede => hospede.cpf !== cpf);
            localStorage.setItem('hospedes', JSON.stringify(this.hospedes));
        },
        backupData() {
            const dataStr = JSON.stringify(this.hospedes);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'hospedes_backup.json';
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
                        this.hospedes = data;
                        localStorage.setItem('hospedes', JSON.stringify(this.hospedes));
                    } catch (error) {
                        alert('Erro ao importar dados: Arquivo inválido');
                    }
                };
                reader.readAsText(file);
            } else {
                alert('Por favor, selecione um arquivo JSON.');
            }
        },
        resetForm() {
            this.newHospede = {
                nome: '',
                cpf: '',
                dataNascimento: '',
                cidade: '',
                telefone: '',
                observacoes: ''
            };
            this.cpfInput = '';
            this.telefoneInput = '';
        }
    }
};
</script>

<style scoped>
/* Estilos específicos para a view de cadastros */
</style>