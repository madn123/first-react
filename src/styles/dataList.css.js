import styled from "styled-components";

const css = {
    DataContainer: styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        position: relative;
        width: 800px;
        height: auto;
        border-radius: 8px;
        box-shadow: 0 0 3px grey;
        margin: 40px auto 40px;
        padding: 20px;
        gap: 10px;
    `,
    ContentLine: styled.div`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        position: relative;
        width: 100%;
    `,
    ContentCell: styled.span`
        display: block;
        position: relative;
        width: ${props => props.width};
        font-size: 14px;
        color: ${props => props.$color};
    `,
    ButtonsLine: styled.div`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        position: relative;
        width: 800px;
        margin: 0 auto;
        margin-top: 40px;
    `,
    ButtonItem: styled.span`
        display: block;
        position: relative;
        font-size: 13px;
        color: gray;
        margin-right: 40px;
        cursor: pointer;
        font-weight: ${props => props.$isBold ? 'bold' : 'normal'};
    `
}

export default css;