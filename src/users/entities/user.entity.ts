
import { CategoryEntity } from "src/categories/entities/category.entity";
import { ProductEntity } from "src/product/entities/product.entity";
import { Roles } from "src/util/common/user-role";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column({select: false})
    password: string;

    @Column({
        type: 'enum',
        enum: Roles,
        default: Roles.USER,
    })
    role: Roles;

    @CreateDateColumn()
    createdAt: Timestamp;

    @UpdateDateColumn()
    updatedAt: Timestamp;

    @OneToMany(() => CategoryEntity, (cat) => cat.addedBy)
    categories: CategoryEntity[]

    @OneToMany(() => ProductEntity, (prod) => prod.addedBy)
    products: ProductEntity[]
}
