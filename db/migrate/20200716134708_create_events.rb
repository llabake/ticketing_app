class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.string :title
      t.datetime :starts_at
      t.datetime :ends_at
      t.boolean :active, default: true
      t.boolean :free, default: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
