import imgSrcSet from "./util/imgSrcSet";

export default function Retailer({ link, image, name }) {
  return (
    <div className="w-third-ns w-50 pa2 border-box flex w100">
      <a
        className="db pa2 raise bg-off-white flex items-center w-100 br1"
        target="_blank"
        href={link}
      >
        <img
          {...imgSrcSet({
            src: image,
            resize: "fit",
            h: 100,
          })}
          alt={name}
          className="db mw-100 br0 center"
        />
      </a>
      <style jsx>{`
        img {
          max-height: 100px;
        }
      `}</style>
    </div>
  );
}
