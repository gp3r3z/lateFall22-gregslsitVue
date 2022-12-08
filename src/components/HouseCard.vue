<template>
    <div class="card text-center elevation-2 selectable" @click="goTo">
        <img :src="house.imgUrl" class="img-fluid rounded square-bottom" alt="">
        <h5>{{ house.bedrooms }} | {{ house.bathrooms }} | {{ house.year }}</h5>
        <h5>${{ house.price }}</h5>
        <div class="p-2 text-start">{{ house.description }}</div>
        <button v-if="(house.creatorId == account.id)" @click="removeHouse(house.id)"
            class="btn btn-danger delete-btn rounded-pill"><i class="  px-2 mdi mdi-delete-forever"></i></button>
        <div v-if="house.creator" class="creator text-end p-1">
            <img :src="house.creator.picture" alt="">
            <span>{{ house.creator.name }}</span>
        </div>
    </div>

</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { housesService } from '../services/HousesService.js';
import { useRouter } from 'vue-router';
import Pop from '../utils/Pop.js';

import { logger } from '../utils/Logger.js';

export default {
    props: { house: { type: Object, required: true } },
    setup(props) {
        const router = useRouter()
        return {
            account: computed(() => AppState.account),
            async removeHouse() {
                // note with props the id here is unused
                try {

                    await housesService.removeHouse(props.house.id)

                } catch (error) {
                    Pop.error(error)
                    logger.error(error)
                }
            },
            // TODO working on goto 

            goTo() {
                logger.log('pushing')
                router.push({ name: 'HouseDetails', params: { id: props.house.id } })
            }
        }
    }
};
</script>


<style lang="scss" scoped>
.card {
    position: relative;

    &:hover .delete-btn {
        display: block;
        opacity: 1;
    }

    .delete-btn {
        position: absolute;
        top: 3px;
        right: 3px;
        display: none;
        opacity: 0;
        transition: all .2s linear .5s;
    }

    img {
        height: 15vh;
        object-fit: cover;
    }

    .creator {

        img {
            height: 30px;
            border-radius: 50em;
            margin-right: .25em;
        }
    }
}
</style>