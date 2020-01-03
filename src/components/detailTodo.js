import React from 'react';
import { Layout } from 'antd';

function DetailTodo() {
    const todo = {
        id: 1,
        text: 'learn hook'
    }

    return (
        <Layout>
            {todo.text}
        </Layout>
    )
}
export default DetailTodo;