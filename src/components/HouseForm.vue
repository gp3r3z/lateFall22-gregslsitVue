<template>

    <form @submit.prevent="handleSubmit()" class="row justify-content-end">
        <div class="mb-3 col-3">
            <label for="" class="form-label">Bedrooms</label>
            <input type="text" class="form-control" v-model="editable.bedrooms">
            <small id="helpId" class="form-text text-muted">Number of Bedrooms</small>
        </div>
        <div class="mb-3 col-3">
            <label for="" class="form-label">Bathrooms</label>
            <input type="text" class="form-control" v-model="editable.bathrooms">
            <small id="helpId" class="form-text text-muted">Number of Bathrooms</small>
        </div>
        <div class="mb-3 col-3">
            <label for="" class="form-label">Levels</label>
            <input type="number" class="form-control" v-model="editable.levels">
            <small id="helpId" class="form-text text-muted">Numbers of levels text</small>
        </div>
        <div class="mb-3 col-3">
            <label for="" class="form-label">Image Url</label>
            <input type="url" class="form-control" v-model="editable.imgUrl" placeholder="">
            <small id="helpId" class="form-text text-muted"> insert valid imgURL</small>
        </div>
        <div class="mb-3 col-3">
            <label for="" class="form-label">Year</label>
            <input type="Number" class="form-control" v-model="editable.year">
            <!-- <img :src="editable.imgUrl" class="img-fluid" alt=""> -->
        </div>
        <div class="mb-3 col-3">
            <label for="" class="form-label">Price</label>
            <input type="Number" class="form-control" v-model="editable.price">

        </div>
        <div class="mb-3 col-12">
            <label for="" class="form-label">Description</label>
            <textarea name="" id="" class="form-control" rows="3" v-model="editable.description"></textarea>

        </div>
        <div class="mb-3 col-4">
            <button class="btn  w-100 rounded-pill selectable text-danger darken-20" type="button"
                @click="editable = {}">Cancel</button>
        </div>
        <div class=" mb-3 col-4">
            <button v-if="!editable.id" class="btn btn-primary w-100 rounded-pill">Create</button>
            <button v-else class="btn btn-success w-100 rounded-pill">Save</button>
        </div>
    </form>

</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { housesService } from '../services/HousesService.js';


export default {
    props: { houseData: { type: Object, default: {} } },
    // NOTE emit is black magic and should only be used in very rare cases AKA not friday
    setup(props, { emit }) {
        // let editable = reactive({})
        onMounted(() => {
            editable.value = props.houseData
        })
        const editable = ref({})
        async function createHouse() {
            try {
                logger.log(editable.value)
                await housesService.createHouse(editable.value)
                editable.value = {}
                Pop.toast('created House', 'success')
            } catch (error) {
                Pop.error(error)
                logger.error(error)
            }
        }
        async function editHouse() {
            try {
                await housesService.editHouse(editable.value)
                Pop.toast('edited House', 'success')
                emit('houseEdited')
            } catch (error) {
                Pop.error(error)
                logger.error(error)
            }
        }
        return {
            editable,
            async handleSubmit() {
                if (props.houseData.id) {
                    await editHouse()
                } else {
                    await createHouse()
                }
            }

        }
    }
};
</script>


<style lang="scss" scoped>

</style>
