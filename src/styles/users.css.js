import styled from "styled-components";

const css = {
    List: styled.div`
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        flex-direction: column;
        gap: 20px;
        padding: 60px;
    `,
    User: styled.div`
        display: flex;
        align-items: baseline;
        gap: 20px;
        padding: 20px;
        border-radius: 10px;
        border: 1px solid gray;
        cursor: pointer;
        transition: background-color 0.3s, box-shadow 0.3s;

        &:hover {
            background-color: #f0f0f0;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        }
    `,
    Title: styled.b`
        font-weight: 600;
        font-size: 16px;
    `,
    Text: styled.span`
        color: gray;
    `
}

export default css;