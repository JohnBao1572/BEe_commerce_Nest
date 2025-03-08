import { ProductEntity } from "src/product/entities/product.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity('categories')
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @CreateDateColumn()
    createdAt: Timestamp;

    @UpdateDateColumn()
    updatedAt: Timestamp;

    @ManyToOne(() => UserEntity,(user) => user.categories)
    addedBy:UserEntity

    @OneToMany(() => ProductEntity,(prod) => prod.category)
    product: ProductEntity[]
}
