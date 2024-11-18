<template>
    <div class="formula-settings-card" :data-opened="isOpenedSearch">
        <div class="formula-heading" @click="toggleSearchProducts">
            <h2 class="heading-lg">
                Add products
            </h2>
            <span class="formula-heading-icon formula-heading-icon-arrow">
                <img src="../assets/icon-arrow-top.svg" alt="arrow-top">
            </span>
        </div>
        <div class="search-card" aria-controls="search-collections">
            <div class="input-field input-field-search">
                <img class="input-field-search-icon" src="../assets/icon-search.svg" alt="search-icon">
                <input v-model="searchStr" @input="handleInput" type="text" class="input body-md search-input"
                    placeholder="Search" id="search-product-input">
            </div>
            <div v-if="selectedProducts.length > 0" class="selected-collections-input-field custom-checkbox-field">
                <input class="custom-checkbox-input" type="checkbox" name="selected" id="select-all-products"
                    :checked="selectedProducts.length > 0" @change="deselectProducts">
                <label class="custom-checkbox-label" for="select-all-products">
                    <div class="custom-checkbox">
                        <img src="../assets/icon-minus.svg" alt="minus-icon" class="custom-checkbox-checkmark">
                    </div>
                    <span class="custom-checkbox-label-title body-md-b" id="selected-products-quantity">
                        {{ selectedProducts.length }} selected
                    </span>
                </label>
            </div>
            <div class="search-results">
                <div v-for="(productEdge, idx) in products" :key="idx"
                    class="search-result search-result-product-wrapper">
                    <div class="search-result-product custom-checkbox-field">
                        <input class="custom-checkbox-input" type="checkbox" name="selected-product"
                            v-model="selectedProducts" :value="productEdge"
                            :id="`search-result-${productEdge.node.id}`">
                        <label class="custom-checkbox-label" :for="`search-result-${productEdge.node.id}`">
                            <div class="custom-checkbox">
                                <img src="../assets/icon-checkmark.svg" alt="checkmark-icon"
                                    class="custom-checkbox-checkmark">
                            </div>
                            <img :src="getProductImageSrc(productEdge)" alt="image-placeholder"
                                class="custom-checkbox-label-image">
                            <span class="custom-checkbox-label-title body-md-b product-title">
                                {{ productEdge.node.title }}
                            </span>
                        </label>
                    </div>
                    <div v-show="productEdge.node.variants.edges?.length > 1"
                        v-for="(variantEdge, idx) in productEdge.node.variants.edges" :key="idx"
                        class="search-result-variant custom-checkbox-field">
                        <input class="custom-checkbox-input" type="checkbox" name="selected-variant"
                            v-model="selectedVariants" :value="variantEdge" @change="handleVariantChange(productEdge)"
                            :id="`search-result-${variantEdge.node.id}`">
                        <label class="custom-checkbox-label" :for="`search-result-${variantEdge.node.id}`">
                            <div class="custom-checkbox">
                                <img src="../assets/icon-checkmark.svg" alt="checkmark-icon"
                                    class="custom-checkbox-checkmark">
                            </div>
                            <img :src="getVariantImageSrc(variantEdge)" alt="image-placeholder"
                                class="custom-checkbox-label-image">
                            <span class="custom-checkbox-label-title body-md-b variant-title">
                                {{ variantEdge.node.title }}
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="formula-settings-card-controls">
            <button @click="toggleSearchProducts" class="search-btn-cancel btn btn-secondary"
                aria-controls="cancel-selected-products">
                Cancel
            </button>
            <button @click="saveProducts" class="search-btn-save btn btn-primary"
                aria-controls="save-selected-products">
                Save
            </button>
        </div>
    </div>
</template>

<script>
import { debounce } from 'lodash';
import { findProducts } from '../api/getResources';
export default {
    name: 'SearchProducts',
    data() {
        return {
            searchStr: '',
            products: [],
            selectedProducts: [],
            selectedVariants: [],
            isOpenedSearch: false,
        };
    },
    props: {
    },
    computed: {
    },
    methods: {
        toggleSearchProducts() {
            this.isOpenedSearch = !this.isOpenedSearch;
        },
        async searchProducts(query) {
            const products = await findProducts(query);
            return products;
        },
        handleInput: debounce(async function () {
            const foundProducts = await this.searchProducts(this.searchStr);
            foundProducts?.forEach(product => {
                if (!this.products.find(p => p.node.id === product.node.id)) {
                    this.products.push(product);
                }
            });
        }, 1000),
        getProductImageSrc(productEdge) {
            const url = productEdge.node.featuredMedia?.preview?.image?.url || '/assets/image-placeholder.jpg';
            return url;
        },
        getVariantImageSrc(variantEdge) {
            return variantEdge.node.image?.url || '/assets/image-placeholder.jpg';
        },
        selectProduct(productEdge) {
            productEdge.selected = !productEdge.selected;
        },
        handleVariantChange(productEdge) {
            // Проверяем, есть ли выбранные варианты для этого продукта
            const hasSelectedVariants = productEdge.node.variants.edges.some(variant =>
                this.selectedVariants.includes(variant)
            );

            // Если есть выбранные варианты, добавляем родительский продукт в выбранные
            if (hasSelectedVariants && !this.selectedProducts.includes(productEdge)) {
                this.selectedProducts.push(productEdge);
            } else if (!hasSelectedVariants) {
                // Если вариантов нет, удаляем продукт из выбранных
                this.selectedProducts = this.selectedProducts.filter(
                    product => product.node.id !== productEdge.node.id
                );
            }
        },
        saveProducts() {
            const productWithSelectedVariants = JSON.parse(JSON.stringify(this.selectedProducts));
            productWithSelectedVariants.forEach(product => {
                const newVariants = [];
                product.node.variants.edges.forEach(variant => {
                    if (this.selectedVariants.find(selectedVariant => selectedVariant.node.id === variant.node.id)) {
                        newVariants.push(variant);
                    }
                });
                product.node.variants.edges = newVariants;
            });
            
            this.$emit('save', productWithSelectedVariants);
            this.toggleSearchProducts();
        },
        deselectProducts() {
            this.selectedProducts = [];
            this.selectedVariants = [];
        },
    },
};
</script>

<style scoped lang="scss">
.formula-settings-card[data-opened="false"] {
    height: 120px;
    overflow: hidden;
}

.search-result {
    .custom-checkbox-label-image {
        width: 40px;
    }
}
</style>