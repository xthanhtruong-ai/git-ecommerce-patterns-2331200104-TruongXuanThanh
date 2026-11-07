import { InventoryService } from '../../services/InventoryService.js';
import { PaymentService } from '../../services/PaymentService.js';
import { ShippingService } from '../../services/ShippingService.js';

class CheckoutFacade {
    constructor() {
        this.inventoryService = new InventoryService();
        this.paymentService = new PaymentService();
        this.shippingService = new ShippingService();
    }

    placeOrder(orderDetails) {
        // TODO: Implement the Facade method.
        // This method should orchestrate the calls to the subsystem services
        // in the correct order to simplify the checkout process.
        // 1. Check if all products are in stock using `inventoryService.checkStock()`.
        // 2. If they are, process the payment using `paymentService.processPayment()`.
        // 3. If payment is successful, arrange shipping using `shippingService.arrangeShipping()`.
        // 4. Log the result of each step. If a step fails, log it and stop.
        const inStock = this.inventoryService.checkStock(orderDetails.productIds);

        if (!inStock) {
            console.log('[Checkout] Order stopped: items are out of stock.');
            return;
        }

        const paymentSuccessful = this.paymentService.processPayment(
            orderDetails.userId,
            orderDetails.amount
        );

        if (!paymentSuccessful) {
            console.log('[Checkout] Order stopped: payment failed.');
            return;
        }

        const shipment = this.shippingService.arrangeShipping(
            orderDetails.userId,
            orderDetails.shippingInfo
        );

        if (!shipment) {
            console.log('[Checkout] Order stopped: shipping could not be arranged.');
            return;
        }

        console.log(`[Checkout] Order placed successfully. Tracking ID: ${shipment.trackingId}`);
    }
}

export { CheckoutFacade };
