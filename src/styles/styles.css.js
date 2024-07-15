import { Container } from "@mui/material";
import styled from "styled-components";

const css = {
    HeaderContainer: styled.header`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        position: relative;
        width: 100%;
        height: 80px;
        background-color: #202634;
        padding: 0 30px;
    `,
    FooterContainer: styled.footer`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        position: relative;
        width: 100%;
        height: 80px;
        background-color: #e5e5e5;
        /* position: absolute; */
        bottom: 0;
    `,
    HeaderCSS: {
        Logo: styled.div`
            font-size: 30px;
            color: #b0f347;
        `,
        MenuContainer: styled.div`
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            position: relative;
        `
    },
    Container: styled.div`
        min-height: calc(100vh - 160px);
    `,
    Wrapper: styled.div`
        display: flex;
        flex-direction: column;
    `
}

export default css;