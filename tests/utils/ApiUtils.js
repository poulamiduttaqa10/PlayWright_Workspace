class ApiUtils{
    constructor(apiContext,loginPayLoad){
        this.apiContext=apiContext;
        this.loginPayLoad=loginPayLoad;
    }
    async getToken(){
    const loginResponse=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{
        data: this.loginPayLoad
    });
    //await  expect(await loginResponse.ok()).toBeTruthy();
    const loginResponseJson= await loginResponse.json();
    const token=await loginResponseJson.token;
    //await token = loginResponseJson.token;
    await console.log(token);
    return token;
    }
    async createOrder(orderPayLoad){
        const response={};
        response.token=await this.getToken();
        const orderResponse=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
                data: orderPayLoad,
                headers: {
                 'Authorization': response.token,
                 'Content-Type': "application/json"
                }
            });
            const OrderResponseJson=await orderResponse.json();
            console.log(OrderResponseJson);
            const orderId=OrderResponseJson.orders[0];
            console.log(orderId);
            response.orderId=orderId;
            return response;
    }
}
module.exports={ApiUtils};