import { CategoryEntity } from "src/categories/entities/category.entity";
import { OrderEntity } from "src/orders/entities/order.entity";
import { orderProductEntity } from "src/orders/entities/orders-products.entity";
import { ReviewEntity } from "src/reviews/entities/review.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity('product')
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({type: 'decimal', precision: 10, scale: 2, default: 0})
    price: number;

    @Column()
    stock: number;

    @Column('simple-array')
    img: string[];

    @CreateDateColumn()
    createdAt: Timestamp;

    @UpdateDateColumn()
    updatedAt: Timestamp;

    @ManyToOne(() => UserEntity, (user) => user.products)
    addedBy: UserEntity

    @ManyToOne(() => CategoryEntity,(cats) => cats.product)
    category: CategoryEntity

    @OneToMany(() => ReviewEntity,(rev) => rev.prod)
    reviews: ReviewEntity[];

    @OneToMany(() => OrderEntity, (op) => op.products)
    products: orderProductEntity[]
}
