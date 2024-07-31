import { Container } from "@mui/material";
import styled from "styled-components";

const css = {
    HeaderContainer: styled.header`
        display: grid;
        align-items: center;
        grid-template-columns: repeat(3, 1fr);
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
            gap: 15px;
        `,
        PersonalContainer: styled.div`
            display: flex;
            align-items: center;
            gap: 15px;
            color: white;
            font-weight: 600;
            min-width: 300px;
            margin-left: auto;
        `
    },
    Container: styled.div`
        min-height: calc(100vh - 160px);
        display: grid;
        padding: 20px;
    `,
    Wrapper: styled.div`
        display: flex;
        flex-direction: column;
    `
}

export default css;