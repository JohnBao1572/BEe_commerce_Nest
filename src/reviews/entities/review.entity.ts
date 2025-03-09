import { ProductEntity } from "src/product/entities/product.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";


@Entity('review')
export class ReviewEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ratings: number;

    @Column()
    comment: string;

    @CreateDateColumn()
    createdAt: Timestamp;

    @UpdateDateColumn()
    updatedAt: Timestamp;

    @ManyToOne(() => UserEntity,(user)=> user.reviews)
    addedBy: UserEntity

    @ManyToOne(() => ProductEntity, (prod) => prod.reviews)
    prod: ProductEntity
}
