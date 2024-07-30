<template>
    <div class="flex flex-col sm:flex-row justify-around bg-green-600">
        <div class="my-6">
            <ul class="flex flex-row justify-evenly text-white">
                <li class="bg-green-800 rounded mx-2 py-2 hover:bg-green-900"><router-link to="/"
                        class="px-6 font-bold text-xl">Quartos</router-link></li>
                <li class="bg-green-800 rounded mx-2 py-2 hover:bg-green-900"><router-link to="/cadastros"
                        class="px-6 font-bold text-xl">Cadastros</router-link></li>
                <!--   <li class="bg-green-800 rounded mx-2 py-2 hover:bg-green-900"><router-link to="/reservas" class="px-6 font-bold text-xl">Reservas</router-link></li> -->
            </ul>
        </div>
        <div class="my-6">
            <h1 class="font-bold text-4xl text-white">Hotel Minas Bahia</h1>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>