import { ProductEntity } from "src/product/entities/product.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "./order.entity";
import { UserEntity } from "src/users/entities/user.entity";


@Entity('shippingAddress')
export class shippingEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({default: ''})
    name: string;

    @Column()
    phone: string;

    @Column()
    address: string;

    @Column()
    city: string;

    @Column()
    postCode: string;

    @Column()
    state: string;

    @Column()
    country: string;

    @OneToOne(() => OrderEntity,(order)=> order.shipping)
    order: OrderEntity

    @ManyToOne(() => UserEntity, (user)=> user.shipping)
    addedBy: UserEntity
}
