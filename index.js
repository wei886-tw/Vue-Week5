const { createApp } = Vue;
const myModal = "";
import infoModal from "./infoModal.js";
// import { LoadingPlugin } from '../Week5/node_modules/vue-loading-overlay';
// import '../Week5/node_modules/vue-loading-overlay/dist/css/index.css';

const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);

loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json');

configure({
  generateMessage: localize('zh_TW'),
});


const app = Vue.createApp({
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io',
      api_path: 'wei123',
      url: 'https://vue3-course-api.hexschool.io/v2/api/wei123',
      allProducts: [],
      cartProducts: [],
      cartInfo: {},
      tempProduct: {},
      currentCart: {},
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },

  components: {
    infoModal,
  },

  methods: {
    getProducts() {
      axios.get(`${this.apiUrl}/api/${this.api_path}/products/all`)
        .then((res) => {
          this.allProducts = res.data.products;
        });
    },

    openModal(product) {
      this.tempProduct = { ...product };
      this.myModal.show();
    },

    getCarts() {
      axios.get(`${this.apiUrl}/v2/api/${this.api_path}/cart`)
        .then(res => {
          this.cartProducts = res.data.data.carts;
          this.cartInfo = res.data.data;
        })

        .catch(err => {
          console.log(err);
        });
    },

    addToCart(id, qty = 1) {
      const cart = {
        product_id: id,
        qty,
      };

      axios.post(`${this.url}/cart`, { data: cart })
        .then(res => {
          alert("加入購物車成功");
          console.log(this.cartProducts);
          this.getCarts();
        })
        .catch(err => {
          console.log(err);
        });
    },

    delCartItem(id) {
      axios.delete(`${this.apiUrl}/v2/api/${this.api_path}/cart/${id}`)
        .then(res => {
          alert("確定刪除購物車品項？");
          console.log(this.cartProducts);
          this.getCarts();
        })
        .catch(err => {
          console.log(err);
        });
    },

    delAllCartItems() {
      axios.delete(`${this.apiUrl}/v2/api/${this.api_path}/carts`)
        .then(res => {
          console.log(res);
          alert("確定要清空購物車嗎");
          this.getCarts();
        })
        .catch(err => {
          console.log(err);
        });
    },

    setCartItemQty(id, event) {
      this.currentCart = this.cartProducts.find(item => item.id === id);
      const index = this.cartProducts.indexOf(this.currentCart);
      this.cartProducts[ index ].product.qty = Number(event.target.value);
      this.cartProducts[ index ].total = Number(event.target.value) * this.cartProducts[ index ].product.price;
      console.log(this.cartInfo);
    },

    modalAddToCart(tempProduct) {
      const cart = {
        product_id: tempProduct.id,
        qty: tempProduct.num,
      };

      axios.post(`${this.url}/cart`, { data: cart })
        .then(res => {
          alert("加入購物車成功");
          this.myModal.hide();
          this.getCarts();
        })
        .catch(err => {
          console.log(err);
        });
    },

    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '需要正確的電話號碼';
    },

    submitOrder() {
      const data = this.form;
      axios.post(`${this.apiUrl}/v2/api/${this.api_path}/order`, { data: data })
        .then(res => {
          alert(res.data.message);
          this.$refs.form.resetForm();
          this.getCarts();
        })
        .catch(err => {
          alert(err);
        });
    },
  },

  mounted() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common.Authorization = token;
    this.myModal = new bootstrap.Modal(document.getElementById('myModal'));
    this.getProducts();
    this.getCarts();
  },
});
// app.use(LoadingPlugin);

app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);
// app.component(Loading);

app.mount('#app');