import mongoose, { Schema, Document, ObjectId } from "mongoose";
/////////////////////////////////////////////////////////////////////////////
export interface IOrderItem {
    productTitle : string;
    productImage: string;
    unitPrice: number;
    quantity: number;
};
const OrderItemSchema = new Schema<IOrderItem>({
    productTitle: { type: String, required: true },
    productImage: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true }
})
/////////////////////////////////////////////////////////////////////////////
export interface IOrder extends Document {
    orderItems: IOrderItem[];
    total: number;
    address: string;
    // ref
    userId: ObjectId | string;
}
const OrderSchema = new Schema<IOrder>({
     orderItems: [OrderItemSchema],
     total: { type: Number, required: true },
     address: { type: String, required: true },
     userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
})
export const orderModel = mongoose.model<IOrder>("Order", OrderSchema);
////////////////////////////////////////////////////////////////////////////