
export function createProduct(newProduct) {
  return new Promise( async (resolve) =>{
    //TODO : we will not hard-code server URL here
    const response =  await fetch('http://localhost:8080/products',{
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: { "content-type": "application/json" },
    })
    const data = await response.json()
    resolve({data})}
  );
}
export function updateProduct(update) {
  return new Promise( async (resolve) =>{
    //TODO : we will not hard-code server URL here
    const response =  await fetch('http://localhost:8080/products/'+ update.id,{
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    })
    const data = await response.json()
    resolve({data})}
  );
}

export function fetchProductsByFilters(filter,sort,pagination,admin) {
  //filter = {"category":["smartphone","laptops"]}
  //sort = {_sort:"price",_order="desc"}
  //pagination = _page=1_limit=10
  //TODO : on Server we will support multi values
  let queryString = '';
  for(let key in filter){
    const categoryValues = filter[key];
    if(categoryValues.length){
      const lastCategoryValue = categoryValues[categoryValues.length - 1]
      queryString += `${key}=${lastCategoryValue}&`
    }
  }
  for(let key in sort){
    queryString += `${key}=${sort[key]}&`
  }
  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`
  }
  if(admin){
    queryString += `admin=true`;
  }
  return new Promise( async (resolve) =>{
    //TODO : we will not hard-code server URL here
    const response =  await fetch('http://localhost:8080/products?'+queryString+"isAdmin=true")
    const data = await response.json()
    const totalItems = response.headers.get('X-Total-Count')
    resolve({data:{products:data,totalItems:+totalItems}})}
  );
}

export function fetchAllCategories() {
  return new Promise( async (resolve) =>{
    //TODO : we will not hard-code server URL here
    const response =  await fetch('http://localhost:8080/categories')
    const data = await response.json()
    resolve({data})}
  );
}
export function fetchAllBrand() {
  return new Promise( async (resolve) =>{
    //TODO : we will not hard-code server URL here
    const response =  await fetch('http://localhost:8080/brands')
    const data = await response.json()
    resolve({data})}
  );
}
export function fetchProductById(id) {
  return new Promise( async (resolve) =>{
    //TODO : we will not hard-code server URL here
    const response =  await fetch('http://localhost:8080/products/'+id)
    const data = await response.json()
    resolve({data})}
  );
}