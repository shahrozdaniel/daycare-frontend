import { HeaderContainer, ModalDetailsContainer } from '@/app/reports/Common.styled'
import React from 'react'

const RenderFile: React.FC<any> = ({ url, closeModal }) => {
    return (
        <ModalDetailsContainer>
            <HeaderContainer>
                <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium item-end">

                </div>
                <button className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium item-end" onClick={closeModal}>
                    X
                </button>
            </HeaderContainer>
            <div style={{ height: "100%", width: "60%" }}>
                <iframe src={url} />
            </div>
        </ModalDetailsContainer>
    )
}

export default RenderFile