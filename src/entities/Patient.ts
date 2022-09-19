import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid"
import { Medic } from "./Medic";

@Entity("patients")
class Patient {

    @PrimaryColumn()
    id: string

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    dni: number;

    @Column()
    sexo: string;
    
    @Column()
    obraSocial: string;

    @ManyToMany(() => Medic, {
        cascade: true
    })

    @JoinTable( {name: "turnos"})
    medics: Medic[];


    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor () {
        if (!this.id) {
            this.id = uuid()
        }
    }
    
}
export { Patient }