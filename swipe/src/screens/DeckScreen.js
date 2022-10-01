import { View, StyleSheet } from 'react-native';
import { Card, Button } from '@rneui/themed';
import Deck from '../components/Deck';

const DATA = [
  { id: 1, text: 'Card #1', uri: 'https://d2908q01vomqb2.cloudfront.net/4d134bc072212ace2df385dae143139da74ec0ef/2020/12/22/image011-2.png' },
  { id: 2, text: 'Card #2', uri: 'https://www.mongodb.com/community/forums/uploads/default/original/3X/e/3/e34df4548886a9dee53fe301fb82f231a9473fce.png' },
  { id: 3, text: 'Card #3', uri: 'https://pics.filmaffinity.com/Kung_Fu_Panda-200447264-large.jpg' },
  { id: 4, text: 'Card #4', uri: 'https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2022/07/Kung-Fu-Panda-El-caballero-del-Dragon-critica-de-la-serie-de-Netflix.jpg?fit=1920%2C1080&quality=50&strip=all&ssl=1' },
  { id: 5, text: 'Card #5', uri: 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/950/public/media/image/2022/06/kung-fu-panda-caballero-dragon-netflix-2734879.jpg?itok=ydM_6yA8' },
  { id: 6, text: 'Card #6', uri: 'https://i.blogs.es/621217/kung-fu-panda-3-poster/1366_2000.jpg' },
  { id: 7, text: 'Card #7', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 8, text: 'Card #8', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
];

export default function DeckScreen() {
  return (
    <View style={styles.container}>
      <Deck
        data={DATA}
        renderNoMoreCards={() => {
          return (
            <Card>
              <Card.Title>There are no more cards!</Card.Title>
              <Button icon={{ name: 'code' }} backgroundColor="#03A9FA" title="View More!" />
            </Card>
          )
        }}
        renderCard={(item) => {
          return (
            <Card key={item.id}>
              <Card.Title>{item.text}</Card.Title>
              <Card.Image style={{ padding: 0 }} source={{ uri: item.uri }} />
              <Button icon={{ name: 'code' }} backgroundColor="#03A9FA" title="View Now!" />
            </Card>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
