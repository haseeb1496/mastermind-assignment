import './ColorSelector.scss'

function ColorSelector(props: { colors: string[], selectedColor: string, selectColor: (color: string) => void }) {
    return (
        <div className='color-selector'>
            {props.colors.map((color, i) => 
                <div className={'color ' + ( props.selectedColor === color ? 'active' : '' )}
                     style={{ backgroundColor: color }}
                     onClick={() => props.selectColor(color)}
                     key={i}>
                </div>
            )}
        </div>
    );
}

export default ColorSelector;