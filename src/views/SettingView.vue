<template>
    <div>
        <h1>Setting with the id "{{ id }}"!</h1>
        <button @click="editFormula">Go to formula</button>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    computed: {
    },
    methods: {
        editFormula() {
            const timestamp = new Date().getTime();
            const formulaId = `formula-${timestamp}`;
            this.$router.push({ name: 'Formula', params: { id: formulaId } });
        },
    },
};
</script>

<style scoped>
.home {
    text-align: center;
}
</style>