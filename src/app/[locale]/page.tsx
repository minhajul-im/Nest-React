import { locales } from "@/lib/locales";
import { getTranslations } from "next-intl/server";

const HomePage = async () => {
  const t = await getTranslations({
    locales,
    namespace: "HomePage",
  });

  return (
    <div className="container mx-auto py-20">
      <h1 className="text-4xl font-bold text-center">{t("title")}</h1>
      <p className="text-wrap text-base tracking-wide">{t("des")}</p>

      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum error
        ipsam nemo deleniti nihil ducimus voluptatum aspernatur vel, inventore
        rerum exercitationem a iure obcaecati nisi, velit voluptate tenetur
        voluptatibus eos ullam modi dolor. Quam quidem praesentium dignissimos
        officiis, ullam sapiente saepe minima voluptatum accusantium, distinctio
        similique, laborum a aliquam reprehenderit! Optio odio ducimus autem
        temporibus quia tempora nihil nisi a natus. Doloribus at, molestiae modi
        impedit saepe quis maxime sit reprehenderit veniam beatae. Vitae nemo
        sit dignissimos enim nobis saepe laudantium harum quam ex numquam
        quisquam molestiae eaque placeat amet fuga sapiente at impedit,
        voluptatibus, eius nam, fugit dicta iure optio soluta? Fuga illum
        exercitationem vero eius, culpa animi. Aspernatur sunt ipsum qui
        excepturi beatae totam, ullam accusantium ut doloremque dignissimos quis
        consequatur voluptas voluptate modi non ea. Minima rerum, voluptatum
        temporibus eveniet voluptates explicabo ab aperiam, fugiat repellendus
        tempore cupiditate fugit veritatis delectus modi. Ducimus ipsum omnis
        tenetur quo! Laudantium asperiores iure ullam veniam enim, ex dolor
        quibusdam assumenda voluptatem modi molestiae aspernatur rerum non. Vel
        libero, blanditiis nam, aliquid quam autem a soluta optio nesciunt,
        natus itaque sunt velit. Sunt quo cum amet nisi sequi officia natus
        expedita, esse quia dolor quibusdam fugiat aspernatur id, eveniet
        laboriosam obcaecati aliquam aliquid tempore beatae voluptatum vero rem
        voluptatibus? Quia expedita natus omnis nulla ducimus beatae veritatis
        minima voluptatum dolor inventore delectus earum temporibus magni harum
        fuga ratione architecto doloribus, optio soluta? Atque sapiente alias
        assumenda eligendi quam distinctio, quidem, sunt repudiandae vero
        commodi eos fugiat, fugit est quis. Error cumque, officiis quo harum
        ipsa, vel nesciunt, maiores soluta atque non incidunt odit odio eligendi
        repellat mollitia hic ducimus? Et, itaque voluptas fugiat, ducimus
        cupiditate accusamus repudiandae nemo vel praesentium maiores aspernatur
        laborum quasi eligendi iure. Voluptatum nihil saepe dolor quisquam magni
        obcaecati molestiae modi illo repellendus perferendis earum maxime
        perspiciatis expedita veritatis animi tempore, reiciendis distinctio
        culpa minima in? Ea ipsa aut accusantium quas at obcaecati, cupiditate
        consectetur est, numquam alias, explicabo sed amet consequuntur
        laudantium quasi. Repellat excepturi, pariatur facilis rerum a nostrum
        ad eos dolorum fuga, omnis animi quaerat ut inventore ab, quibusdam quas
        architecto quisquam doloribus voluptatum officia facere rem.
        Reprehenderit maxime provident laudantium. Omnis, quis eveniet ipsa
        voluptates sint magnam quidem impedit eum? Veritatis fugit delectus hic
        debitis accusamus natus minima quia placeat ut? Vel laudantium doloribus
        soluta praesentium consectetur perspiciatis cupiditate ad repellendus
        totam dolorem beatae, at vero incidunt et ab voluptatibus porro! Amet
        perspiciatis repellat voluptatibus delectus magni cumque voluptates
        dolor commodi, quasi sapiente obcaecati. Consequatur quaerat tenetur,
        minima vel eveniet ad iure rerum qui! Asperiores, quibusdam. Molestias
        sint alias neque reiciendis earum dolor itaque eum temporibus iste
        ratione, placeat, numquam, soluta architecto tempora inventore expedita
        quibusdam quae voluptates consectetur nemo laudantium in non. Quis
        dolore magni vitae vero iusto deserunt unde dolores magnam, fugit sint
        quo repellendus soluta dolor debitis vel amet, voluptatem nam fuga.
        Placeat, eligendi incidunt. Perferendis id praesentium iusto quisquam
        maxime? Ducimus esse, reprehenderit reiciendis eum odio sit voluptatem
        nam autem earum recusandae fugit iure optio doloribus asperiores
        voluptatibus aperiam. Sed deleniti, voluptatibus veniam dignissimos ea
        iusto consectetur, recusandae nam amet nobis nesciunt! Nobis debitis
        unde nisi. Quisquam consequuntur blanditiis quas consequatur minus dicta
        explicabo, nesciunt excepturi dolores facere adipisci debitis
        perferendis neque enim maiores. Architecto, vel vitae. Quam odit ad
        recusandae doloremque assumenda error quas sapiente reprehenderit eius
        tempora labore illum cumque culpa suscipit, dignissimos hic quis quos,
        dolores saepe. Suscipit a impedit quibusdam esse. Ex quam nemo aliquid,
        ab ratione cum? Similique consequatur ipsam exercitationem eos maxime
        porro accusamus aperiam non optio earum delectus labore nesciunt, iure
        provident asperiores itaque ex, culpa nihil totam! Doloremque laborum
        illum, delectus facilis ad ex soluta aut ullam perferendis alias cumque
        libero deleniti in odio exercitationem excepturi aspernatur sed, minima
        nihil sapiente, modi at animi quasi error! Nam natus pariatur ab at odit
        harum voluptates ipsam fugit maxime. Pariatur est consequuntur,
        perspiciatis, vel quisquam alias vero commodi earum fugiat delectus
        harum? Possimus nihil in impedit fugiat qui deserunt porro omnis
        doloremque explicabo culpa aspernatur, enim voluptas odit earum
        exercitationem, velit, aperiam quisquam quasi dolor incidunt illo ipsam
        quia. Mollitia, delectus, doloremque esse iusto hic sapiente aliquid
        nesciunt, consequuntur velit neque porro placeat voluptatum fugiat
        quisquam nulla provident perspiciatis libero facilis laudantium! Cum quo
        doloremque debitis repellendus non architecto maxime? Veniam, maiores
        quibusdam consectetur quasi at corporis neque, totam quisquam qui velit
        eos cumque labore earum soluta. Totam quasi voluptates, harum sed
        voluptatem esse, laborum ducimus voluptas eum quas numquam delectus,
        deserunt mollitia corrupti tempore rem temporibus architecto eligendi
        eaque qui quod optio illum facilis commodi! Dolorem animi quas nihil
        laborum, mollitia sint deleniti voluptatibus, quaerat non itaque earum
        ipsam quos deserunt aliquam quia rem nulla quibusdam maxime explicabo
        sit consequuntur repellat! Accusantium corporis placeat eveniet quas
        consectetur totam dolore reiciendis soluta atque voluptatum laudantium
        illo harum, velit qui numquam ab aliquam officia ut quibusdam earum?
        Aliquam veniam dolor animi iste quis mollitia maxime maiores unde
        accusantium, rem fugiat soluta velit ipsam quas est aperiam, vitae
        reprehenderit eaque quidem earum sapiente culpa sit voluptas. Cum
        laudantium, ad assumenda quibusdam laboriosam nulla quis, quo iure
        eligendi nam, iusto atque facere tempora iste eos quod tenetur. Veniam,
        dolor minima. Consequatur possimus consequuntur hic velit perferendis
        aliquam tempora totam blanditiis, dolore voluptate reiciendis sequi
        beatae aperiam iusto. Consequuntur, accusantium vel. Deserunt doloremque
        laborum, quo, iste illo modi dicta iure sed quisquam quidem est animi.
        Molestias in quia necessitatibus temporibus, enim quae dolorum nemo
        maiores vel pariatur doloribus odio voluptatum dolores dignissimos
        laboriosam dolor quis error nesciunt accusamus aperiam aspernatur velit
        tempore numquam. Exercitationem neque tempore alias sequi dolor ratione
        voluptate, nam sit quae voluptas dolorem minima eaque doloremque modi
        eveniet maxime animi unde aperiam error. Quia eligendi reprehenderit,
        facilis laborum quam veritatis fugiat delectus iusto eos mollitia dicta
        aliquam nostrum obcaecati ipsa vel impedit, fugit, earum libero enim.
        Neque non magni facere sequi nemo laudantium quia consequatur ipsa
        perspiciatis. Dolorem, est obcaecati aliquid at quidem corporis
        voluptatibus tenetur magni consequatur quam, et recusandae! Neque iure
        iusto, aut possimus ea culpa similique ab quasi, commodi perspiciatis
        velit!
      </p>
    </div>
  );
};

export default HomePage;
