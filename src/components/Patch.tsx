'use client'
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { group, notandi, project } from "@/types/types";
import styles from "./Post.module.scss";
import { b64hex } from "@/util/breytamynd";
import { filterEmptyStrings } from "@/util/filterempty";

export function Patch({ type: initialType, token }: { type: 'users' | 'groups' | 'projects', token: string }) {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData | notandi | group | project>();
    const [error, setError] = useState('')
    const [type] = useState<'users' | 'groups' | 'projects'>(initialType);
    const [users, setUser] = useState<notandi[]>([]);
    const [groups, setGroups] = useState<group[]>([]);
    const [projects, setProjects] = useState<project[]>([]);
    const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
    const [patched, setPatched] = useState(false);

    useEffect(() => {
        const fetchData = async (url: string, setter: (data: any[]) => void, page: number = 1, data: any[] = []) => {
            const response = await fetch(`${url}?page=${page}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const responseData = await response.json();

            if (responseData.message === "Engar niðurstöður" || responseData.length === 0) {
                setter(data);
            } else {
                fetchData(url, setter, page + 1, [...data, ...responseData]);
            }
        };

        fetchData(`${process.env.NEXT_PUBLIC_API_URL}users`, (data) => {
            setUser(data);
            if (initialType === 'users') setSelectedId(data[0]?.id);
        });
        fetchData(`${process.env.NEXT_PUBLIC_API_URL}groups`, (data) => {
            setGroups(data);
            if (initialType === 'groups') setSelectedId(data[0]?.id);
        });
        fetchData(`${process.env.NEXT_PUBLIC_API_URL}projects`, (data) => {
            setProjects(data);
            if (initialType === 'projects') setSelectedId(data[0]?.id);
        });
        setPatched(false);
    }, [patched, initialType, token]);


    const FormPatch = async (data: { [key: string]: any; }) => {
        console.log("FormPatch function called");
        let filteredData;
        if (type === 'users') {
            filteredData = filterEmptyStrings(b64hex(data as notandi));
        } else {
            filteredData = filterEmptyStrings(data);
        }
        console.log(filteredData);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${type}/${selectedId}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(filteredData)
                }
            )
            const message = await response.json()
            if (response.status >= 200 && response.status < 300) {
                setError(`Tókst að uppfæra ${message && message?.id || 'lið'} í ${type}`)
                setPatched(true);
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
                    User
                    <select onChange={e => setSelectedId(e.target.value)}>
                        {users.map(user => <option key={user.id} value={user.id}>{user.username}</option>)}
                    </select>
                </label>
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
                    Group
                    <select onChange={e => setSelectedId(e.target.value)}>
                        {groups.map(group => <option key={group.id} value={group.id}>{group.name}</option>)}
                    </select>
                </label>
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
                    Project
                    <select onChange={e => setSelectedId(e.target.value)}>
                        {projects.map(project => <option key={project.id} value={project.id}>{project.title}</option>)}
                    </select>
                </label>
                <label>
                    Heiti
                    <input type="text" {...register("title", { required: false })} />
                </label>
                <label>
                    Hópur
                    <input type="number" {...register("group_id", { required: false })} />
                </label>
                <label>
                    Sköpuður
                    <input type="number" placeholder={selectedId || ''} {...register('creator_id')} />
                </label>
                <label>
                    Staða
                    <input type="number" {...register("status", { required: false })} />
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