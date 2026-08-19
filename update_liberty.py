import json

with open(r'C:\Users\lnpot\OneDrive\Documentos\Projetos\Turquia-Marica\src\assets\map\liberty.json', 'r', encoding='utf-8') as f:
    style = json.load(f)

# Find and modify layers
for layer in style['layers']:
    layer_id = layer.get('id', '')
    
    # RJ-106 (trunk road) - main road stroke
    if layer_id == 'road_trunk':
        # Update line-color to #ae0011
        if 'paint' in layer and 'line-color' in layer['paint']:
            layer['paint']['line-color'] = '#ae0011'
        # Increase line-width by 35% - the line-width is an interpolate expression
        if 'paint' in layer and 'line-width' in layer['paint']:
            lw = layer['paint']['line-width']
            if isinstance(lw, list) and lw[0] == 'interpolate':
                # Multiply the output values by 1.35
                for i in range(len(lw)):
                    if isinstance(lw[i], (int, float)) and i > 2:  # skip the first few elements (interpolate, linear, zoom)
                        lw[i] = round(lw[i] * 1.35, 2)
    
    # RJ-106 trunk casing - keep neutral/dark for contrast (already dark #251913, keep as is)
    # No change needed for road_trunk_casing
    
    # RJ-106 highway name label - text fill #ae0011, fontSize +1-2px
    if layer_id == 'highway-name-major':
        if 'paint' in layer and 'text-color' in layer['paint']:
            layer['paint']['text-color'] = '#ae0011'
        if 'layout' in layer and 'text-size' in layer['layout']:
            ts = layer['layout']['text-size']
            if isinstance(ts, list) and ts[0] == 'interpolate':
                for i in range(len(ts)):
                    if isinstance(ts[i], (int, float)) and i > 2:
                        ts[i] = round(ts[i] * 1.1, 1)  # ~10% increase (~1-2px)
    
    # Parque Nanci - park fill
    if layer_id == 'park':
        if 'paint' in layer:
            # fill-color: #b8d4a0 (more saturated than current #d1dfc8)
            # Current: rgba(203, 214, 186, 0.72) which is #cbdbba with 0.72 opacity
            # New: #b8d4a0 with opacity >= 0.92
            layer['paint']['fill-color'] = '#b8d4a0'
            layer['paint']['fill-opacity'] = 0.92
            # fill-outline-color - keep consistent
            if 'fill-outline-color' in layer['paint']:
                layer['paint']['fill-outline-color'] = '#b8d4a0'
    
    # Parque Nanci - park outline 
    if layer_id == 'park_outline':
        if 'paint' in layer and 'line-color' in layer['paint']:
            # Keep outline but adjust to complement new fill
            layer['paint']['line-color'] = '#3d5c2a'  # dark green for contrast

# Save
with open(r'C:\Users\lnpot\OneDrive\Documentos\Projetos\Turquia-Marica\src\assets\map\liberty.json', 'w', encoding='utf-8') as f:
    json.dump(style, f, separators=(',', ':'))

print("liberty.json updated successfully")