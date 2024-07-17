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