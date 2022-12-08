<template>
  <div v-if="house" class="container">
    <!-- viewing House -->
    <div v-if="(editMode == false)" class="row justify-content-center">
      <div class="col-12 text-center">
        <h5>{{ house.bedrooms }} | {{ house.bathrooms }} | {{ house.year }}</h5>
        <h5>${{ house.price }}</h5>
      </div>
      <div class="col-6">
        <img :src="house.imgUrl" class="img-fluid rounded square-bottom" alt="">
      </div>
      <div class="col-6 d-flex flex-column justify-content-between">
        <p>{{ house.description }}</p>
        <h3 class="bg-success p-2 text-dark rounded-pill">${{ house.price }}</h3>
      </div>
      <button v-if="(house.creatorId == account.id)" class="btn btn-info" @click="(editMode = true)">edit <i
          class="mdi mdi-pencil"></i></button>
    </div>
    <!-- editing car -->
    <div v-else class="row">
      <!-- props to pass car data  -->
      <!-- @carEdited is a custom event that happens with CarForm emits `carEdited` -->
      <HouseForm :houseData="house" @houseEdited="(editMode = false)" />
      <!-- <button class="btn btn-success" @click="editCar">save <i class="mdi mdi-floppy"></i></button> -->
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { useRoute } from 'vue-router';
import { housesService } from '../services/HousesService.js'




export default {
  setup() {
    const route = useRoute()
    const editMode = ref(false)
    async function getHouseById() {
      try {
        await housesService.getHouseById(route.params.id)
      } catch (error) {
        Pop.error(error)
        logger.error(error)
      }
    }
    onMounted(() => {
      getHouseById()
    })
    return {
      editMode,
      account: computed(() => AppState.account),
      house: computed(() => AppState.activeHouse),
      async editHouse() {


        editMode.value = false
      }
    }
  }
};
</script>


<style lang="scss" scoped>

</style>
