export default function SocialIcon({ svg, link, name }) {
  return (
    <li className="dib ph2 raise">
      <a
        href={link}
        target="_blank"
        className="link bg-white black db relative br-100 pa2"
        aria-label={name}
      >
        <svg width="16px" height="16px" className="db">
          <use xlinkHref={`#${svg}`}></use>
        </svg>
      </a>
    </li>
  );
}
