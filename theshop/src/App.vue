<template>
  <v-app>
    <v-main style="background-color: #f0fcf6;">
      <v-form ref="form">
        <v-container >
          <v-card style="background-color: #ffffff;">
            <div style="display:flex">
              <v-img
                max-height="105px"
                max-width="300px"
                src="https://interconnecta.com/wp-content/uploads/2021/07/logotype-color-alpha.png"
                style="margin-left: 20px; margin-top: 10px;"
              ></v-img>
              <v-card-title style="color: Black;margin-left: 20%;">
                THE SHOP
              </v-card-title>
            </div>
          </v-card>
          <!-- New Product Form -->
          <v-card
            max-width="50%"
            elevation="4"
            class="my-5 px-3"
            style="margin-left: 25%; "
          >
            <form>
              <v-row>
                <v-col cols="4">
                  <v-subheader>Product Store</v-subheader>
                </v-col>
                <v-col cols="8" >
                  <v-autocomplete
                    auto-select-first
                    filled
                    solo
                    v-model="editedProduct.store"
                    :items="stores"
                    item-text="name"
                    item-value="name"
                    :rules="requireRules"
                  ></v-autocomplete>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>Product Name</v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="editedProduct.name"
                    label="Name"
                    :rules="requireRules"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>Description</v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-textarea
                  v-model="editedProduct.description"
                    solo
                    name="input-7-4"
                    label="Description"
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>Price</v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="editedProduct.price"
                    label="Price"
                    prefix="$"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col></v-col>
                <v-col>
                  <v-btn
                    class="mr-4"
                    @click="createProduct"
                  >
                    Create New Product
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn @click="clearForm">
                    clear
                  </v-btn>
                </v-col>
                <v-col></v-col>
              </v-row>
            </form>
          </v-card>
          <!-- Data Table, All products -->
          <v-data-table
            :headers="headers"
            :items="products"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar
                flat
              >
                <v-toolbar-title>List Products</v-toolbar-title>
                <v-divider
                  class="mx-4"
                  inset
                  vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <!-- Edit Product -->
                <v-dialog
                  v-model="dialog"
                  max-width="500px"
                >
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">Test</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedProduct.name"
                              label="Dessert name"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedProduct.description"
                              label="description (g)"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedProduct.price"
                              label="price (g)"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedProduct.store"
                              label="store (g)"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="close"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="save"
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <!-- Delete Product -->
                <v-dialog v-model="dialogDelete" max-width="55%">
                  <v-card>
                    <v-card-title class="text-h5">Are you sure you want to delete this product?</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                      <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="editProduct(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                small
                @click="deleteProduct(item)"
              >
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-container>
      </v-form>

    </v-main>
  </v-app>
</template>
<script>
import axios from 'axios';
export default {
  name: 'App',

  data: () => ({
    requireRules:[
      value=>!!value||'Required'
    ],
    Product_Store:"",
    Name:"",
    Description:"",
    Price:"",
    dialogCreate: false,
    dialog: false,
    dialogDelete: false,
    stores:[],
    headers: [
      { text: 'id',align: 'start',sortable: false,value: 'id'},
      { text: 'Name', value: 'name' },
      { text: 'Description', value: 'description' },
      { text: 'Price', value: 'price' },
      { text: 'Store', value: 'store' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    products: [
      {
      id: '1',
      name: 'Laptop',
      description: 'Laptop apple',
      price: '$ 5000',
      store: 'Apple',
      },
      {
      id: '2',
      name: 'Balon',
      description: 'Balon de Futbol',
      price: '$ 200',
      store: 'Adidas',
      },
      {
      id: '3',
      name: 'Pants',
      description: 'Sport Pants',
      price: '$ 800',
      store: 'Nike',
      },
    ],
    editedIndex: -1,
    editedProduct: {
      id: '',
      name: '',
      description: '',
      price: '',
      store: '',
    },
    defaultItem: {
      id: '',
      name: '',
      description: '',
      price: '',
      store: '',
    },
  }),
  mounted() {
    this.refreshStores();
    this.refreshTable();
  },
  methods: {
    async createProduct(){
      if(this.$refs.form.validate()){
      //console.log(this.products.length);
       this.editedProduct.id=this.products.length + 1;
        if (this.editedIndex > -1) {
          Object.assign(this.products[this.editedIndex], this.editedProduct)
        } else {
          this.products.push(this.editedProduct)
        }
        this.clearForm();
      // Create Product, but there is a Server error
      /*
      try {
            const body={
                  "store_id":"4423254000036622000",
                  "name":"Balon Puma",
                  "description":"Balon Puma para futbol",
                  "price":250
              };
              const response = await axios.post('http://localhost:3000/postProducts', body,{
                  headers: {
                      "Content-Type": "application/json"
                  }
              });
              const responseData = response.data;
              console.log(responseData);
          } catch (error) {
              console.error("Error fetching data:", error);
          }
      */
        
      }
    },
    clearForm(){
      this.editedProduct=this.defaultItem;
    },
    async refreshStores(){
     try {
        const response = await axios.get('http://localhost:3000/getStores',{
            headers: {
                "Content-Type": "application/json"
            }
        });
        const responseData = response.data;
        console.log(responseData);
        this.stores=responseData.resp.data;
      } catch (error) {
          console.error("Error fetching data:", error);
      }
    },
    async refreshTable(){
     try {
        const response = await axios.get('http://localhost:3000/getProducts',{
            headers: {
                "Content-Type": "application/json"
            }
        });
        const responseData = response.data;
        console.log(responseData);
      } catch (error) {
          console.error("Error fetching data:", error);
      }
    },
    clearTable(){

    },
    editProduct(item){
        this.editedIndex = this.products.indexOf(item)
        this.editedProduct = Object.assign({}, item)
        this.dialog = true
    },
    deleteProduct(item){
        this.editedIndex = this.products.indexOf(item)
        this.editedProduct = Object.assign({}, item)
        this.dialogDelete = true
    },
    deleteItemConfirm(){
        this.products.splice(this.editedIndex, 1)
        this.closeDelete()
    },
    closeDelete(){
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
    },
    save(){
        if (this.editedIndex > -1) {
          Object.assign(this.products[this.editedIndex], this.editedItem)
        } else {
          this.products.push(this.editedItem)
        }
        this.close()
    },
    close(){
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
    },
  },
};
</script>