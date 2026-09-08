import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#0a0509",
                }}
            >
                <div
                    style={{
                        width: 16,
                        height: 16,
                        background: "linear-gradient(135deg, #f04b93, #d6266f)",
                        transform: "rotate(45deg)",
                    }}
                />
            </div>
        ),
        { ...size },
    )
}
