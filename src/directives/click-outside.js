export default {
    beforeMount(el, binding) {
        el.clickOutsideEvent = function (event) {
            // Проверяем, был ли клик вне элемента
            if (!(el === event.target || el.contains(event.target))) {
                binding.value(event); // Вызываем переданную функцию
            }
        };
        document.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted(el) {
        document.removeEventListener('click', el.clickOutsideEvent);
    },
};