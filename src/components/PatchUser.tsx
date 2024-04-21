'use client'
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { group, notandi, project } from "@/types/types";
import styles from "./Post.module.scss";
import { b64hex } from "@/util/breytamynd";
import { filterEmptyStrings } from "@/util/filterempty";

export function PatchUser({ type: initialType, token, id, onSuccess }: { type: 'users' | 'groups' | 'projects', token: string, id: string, onSuccess?: () => void }) {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData | notandi | group | project>();
    const [error, setError] = useState('')
    const [type, setType] = useState<'users' | 'groups' | 'projects'>(initialType);

    const FormPatch = async (data: FormData | notandi | group | project) => {
        if (type === 'users') {
            data = b64hex(data as notandi)
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${type}/${id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(filterEmptyStrings(data))
                }
            )
            const message = await response.json()
            if (response.status >= 200 && response.status < 300) {
                setError(`Tókst að uppfæra ${message && message?.id || 'lið'} í ${type}`)
                onSuccess && onSuccess();
            } else {
                setError(`${response.status}: ${response.statusText} ${message && (message?.error || JSON.stringify(message))}`)
            }
        } catch (err) {
            err && setError(JSON.stringify(err));
        }
    }

    return <form onSubmit={handleSubmit(FormPatch)} className={styles.post}>
        {
            type === 'users' &&
            <>
                <label>
                    Notendanafn
                    <input type="text" {...register("username")} />
                </label>
                <label>
                    Lykilorð
                    <input type="text" {...register("password")} />
                </label>
                <label>
                    Group
                    <input type="number" {...register("group_id")} />
                </label>
                <label>
                    Mynd
                    <input type="file" accept=".png,.jpg,.jpeg" id="imageInput" />
                    <input type="text" {...register('avatar', { required: false })} />
                </label>
            </>
        }
        {
            type === 'groups' &&
            <>
                <label>
                    admin id
                    <input type="number" {...register("admin_id")} />
                </label>
                <label>
                    Nafn
                    <input type="text" {...register("name")} />
                </label>
            </>
        }
        {
            type === 'projects' &&
            <>
                <label>
                    Heiti
                    <input type="text" {...register("title", { required: true })} />
                </label>
                <label>
                    Hópur
                    <input type="number" {...register("group_id", { required: true })} />
                </label>
                <label>
                    Sköpuður
                    <input type="number" placeholder={id} {...register('creator_id')} />
                </label>
                <label>
                    Staða
                    <input type="number" {...register("status", { required: true })} />
                </label>
                <label>
                    Ábyrgðaraðili
                    <input type="number" {...register("assigned_id", { required: false })} />
                </label>
                <label>
                    Lýsing
                    <input type="text" {...register("description", { required: false })} />
                </label>
            </>
        }
        {
            error &&
            <p>{error}</p>
        }
        {
            Object.keys(errors).length
                ? <p>{JSON.stringify(errors.root?.message)}</p>
                : null
        }
        <button>Submit</button>
    </form>
}