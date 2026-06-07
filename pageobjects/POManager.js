const { LoginPage } = require('./LoginPage');
const { DashboardPage}=require('./DashboardPage');
const {CartPage} = require('./CartPage');
const { ProductsReviewPage }=require('./ProductsReview');
const {OrderHistoryPage}=require('./OrderHistoryPage');
const { test, expect } = require('@playwright/test');

class POManager{
    constructor(page){
        this.page=page;
        this.LoginPage=new LoginPage(this.page);
        this.DashboardPage=new DashboardPage(this.page);
        this.CartPage=new CartPage(this.page);
        this.ProductsReviewPage=new ProductsReviewPage(this.page);
        this.OrderHistoryPage=new OrderHistoryPage(this.page);
    }
    async getLoginpage(){
        return  await this.LoginPage;
    }
    async getDashboardpage(){
        return await this.DashboardPage;
    }
    async getCartpage(){
        return await this.CartPage;
    }
    async getProductsReviewpage(){
        return await this.ProductsReviewPage;
    }
    async getOrderHistoryPage(){
        return await this.OrderHistoryPage;
    }
}
module.exports = {POManager};