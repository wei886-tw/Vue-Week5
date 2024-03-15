export default {
  data() {
    return {
      text: '內部文字',
      qty: 1,
    };
  },

  props: [ 'allProducts', 'cartProducts', 'modalItem', 'addToCart', 'myModal', "setCartItemQty", "currentCart"],

  methods: {
    add(){
      this.modalItem.num = Number(this.$refs.inputValue.value)
      this.$emit("add", this.modalItem)
    }
  },


  mounted() {

  },
  
  template: `<div class="modal" tabindex="-1" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">測試的產品</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-6" :modalItem="tempProduct">
            <img :src="modalItem.imageUrl" alt="" style="width:200px">
          </div>
          <div class="col-6">
            <p>商品描述：{{modalItem.description}}</p>
            <p>商品內容：{{modalItem.content}}</p>
            <del>原價 {{modalItem.origin_price}} 元</del>
            <p><strong>現在只要 {{modalItem.price}} 元</strong></p>
            <div class="d-flex align-items-end">
            <div class="input-group">
              <input type="number" class="form-control w-50" :value="qty" ref="inputValue" >
              <button class="btn btn-primary"  @click="add" >加入購物車</button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`
};