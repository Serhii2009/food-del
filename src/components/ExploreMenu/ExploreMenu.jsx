import './ExploreMenu.css'
import PropTypes from 'prop-types'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Experience the joy of dining with us! Our menu is a blend of traditional
        and modern dishes, all prepared with love and passion. We believe in
        serving food that not only tastes good but also makes you feel good.
        Join us for an unforgettable culinary journey!
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? 'All' : item.menu_name
                )
              }
              key={index}
              className="explore-menu-list-item"
            >
              <img
                className={category === item.menu_name ? 'active' : ''}
                src={item.menu_image}
                alt=""
              />
              <p>{item.menu_name}</p>
            </div>
          )
        })}
      </div>
      <hr />
    </div>
  )
}

ExploreMenu.propTypes = {
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
}

export default ExploreMenu
