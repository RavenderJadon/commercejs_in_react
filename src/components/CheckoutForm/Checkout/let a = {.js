let a = {
  1:"a",
  2:"b",
  3:"c",
  4:"d"
}
console.log(a);
let b = Object.keys(a)[0];
console.log(b)
let c = Object.entries(a);
console.log(c)

let d = c.map(([i_d,name])=>(
  {id:i_d,label:name}
))

console.log(d)

let shippingCountries=[
  {
    countries: ["BD", "CN", "IN"],
    description: "international",
    id: "ship_kpnNwA2jromXB3",
    price: {raw: 100, formatted: "100.00", formatted_with_symbol: "₹100.00", formatted_with_code: "100.00 INR"}
  }
];

let options = shippingCountries.map((sc)=>({
  id:sc.id,
  label:`${sc.description}-(${sc.price.formatted})`}
  ))
console.log(options)