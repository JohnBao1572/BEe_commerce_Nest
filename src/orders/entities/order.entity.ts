import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { OrderStatus } from "../enum/order-status.enum";
import { UserEntity } from "src/users/entities/user.entity";
import { shippingEntity } from "./shipping.entity";
import { orderProductEntity } from "./orders-products.entity";

@Entity('orders')
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.PROCESSING
    })
    status: string;

    @CreateDateColumn()
    createdAt: Timestamp;

    @Column({nullable: true})
    shippedAt: Date;

    @Column({nullable: true})
    deliveredAt: Date;

    @ManyToOne(() => UserEntity, (user) => user.order)
    addedBy:UserEntity

    @OneToOne(() => shippingEntity,(shipping) => shipping.order, {cascade: true})
    @JoinColumn()
    shipping: shippingEntity

    @OneToMany(() => orderProductEntity, (op) => op.order)
    products: orderProductEntity[]
}
