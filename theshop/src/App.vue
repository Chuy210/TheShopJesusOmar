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
            class="my-5"
            style="margin-left: 25%; "
          >
            <form>
              
              <v-row>
                <v-col cols="4">
                  <v-subheader>Product Name</v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="Name"
                    label="Name"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>Price</v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    label="Price"
                    value="10.00"
                    prefix="$"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-btn
                class="mr-4"
                @click="createProduct"
              >
                Create New Product
              </v-btn>
              <v-btn @click="clearForm">
                clear
              </v-btn>
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
    Product_Store:"",
    Name:"",
    Description:"",
    Price:"",
    dialog: false,
    dialogDelete: false,
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
      id: '0001',
      name: 'Laptop',
      description: 'Laptop apple',
      price: '$ 5000',
      store: 'Apple',
      },
      {
      id: '0002',
      name: 'Balon',
      description: 'Balon de Futbol',
      price: '$ 200',
      store: 'Adidas',
      },
      {
      id: '0003',
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
   async mounted() {
     try {
        const response = await axios.get('/getStores',{
            headers: {
                "Content-Type": "application/json"
            }
        });
        const responseData = response.data;
        console.log(responseData);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    this.refreshTable();
  },
  methods: {
    async createProduct(){
      try {
            const body={
                  "name":"Test 2",
                  "category":"TESTO"
              };
              const response = await axios.post('/postStores', body,{
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
    clearForm(){

    },
    refreshTable(){

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